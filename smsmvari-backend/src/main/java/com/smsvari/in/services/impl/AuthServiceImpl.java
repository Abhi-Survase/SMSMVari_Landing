package com.smsvari.in.services.impl;

import com.smsvari.in.dto.request.*;
import com.smsvari.in.dto.response.ApiResponseDto;
import com.smsvari.in.dto.response.AuthResponseDto;
import com.smsvari.in.dto.response.UserInfoDto;
import com.smsvari.in.entity.PasswordResetOtp;
import com.smsvari.in.entity.User;
import com.smsvari.in.enums.UserStatus;
import com.smsvari.in.exception.AccountLockedException;
import com.smsvari.in.exception.BadCredentialsException;
import com.smsvari.in.exception.InvalidTokenException;
import com.smsvari.in.exception.OtpException;
import com.smsvari.in.exception.UserNotFoundException;
import com.smsvari.in.repository.PasswordResetOtpRepository;
import com.smsvari.in.repository.UserRepository;
import com.smsvari.in.services.AuthService;
import com.smsvari.in.util.IpUtil;
import com.smsvari.in.util.JwtUtil;
import com.smsvari.in.util.OtpUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    // ─── Config ───────────────────────────────────────────────────────────────
    @Value("${app.auth.max-failed-attempts:5}")
    private int maxFailedAttempts;

    @Value("${app.auth.otp-expiry-minutes:10}")
    private int otpExpiryMinutes;

    // ─── Dependencies ─────────────────────────────────────────────────────────
    private final UserRepository             userRepository;
    private final PasswordResetOtpRepository otpRepository;
    private final PasswordEncoder            passwordEncoder;
    private final JwtUtil                    jwtUtil;
    private final OtpUtil                    otpUtil;
    private final IpUtil                     ipUtil;
    // TODO: inject JavaMailSender before deployment
    // private final JavaMailSender          mailSender;

    // =========================================================================
    // LOGIN
    // =========================================================================

    @Override
    @Transactional
    public AuthResponseDto login(LoginRequestDto request, HttpServletRequest httpRequest) {

        String clientIp = ipUtil.extractClientIp(httpRequest);

        // 1. Resolve user — vague error prevents user enumeration
        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        // 2. Reject non-active accounts
        if (user.getStatus() == UserStatus.LOCKED) {
            log.warn("Login attempt on LOCKED account [email={}] [ip={}]", user.getEmail(), clientIp);
            throw new AccountLockedException(
                    "Account is locked due to too many failed login attempts. " +
                            "Please reset your password to unlock.");
        }

        if (user.getStatus() == UserStatus.INACTIVE) {
            log.warn("Login attempt on INACTIVE account [email={}] [ip={}]", user.getEmail(), clientIp);
            throw new AccountLockedException("Account is inactive. Please contact support.");
        }

        // 3. Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            handleFailedAttempt(user, clientIp);
            throw new BadCredentialsException("Invalid email or password");
        }

        // 4. Successful login — reset counters, record IP & timestamp
        user.setFailedLoginAttempts(0);
        user.setLastLoginAt(LocalDateTime.now());
        user.setLastLoginIp(clientIp);
        userRepository.save(user);

        log.info("Successful login [uuid={}] [ip={}]", user.getUuid(), clientIp);

        // 5. Issue tokens
        return buildAuthResponse(user);
    }

    // =========================================================================
    // REFRESH TOKEN
    // =========================================================================

    @Override
    @Transactional(readOnly = true)
    public AuthResponseDto refreshToken(RefreshTokenRequestDto request) {
        String token = request.getRefreshToken();

        if (!jwtUtil.isTokenValid(token)) {
            throw new InvalidTokenException("Refresh token is expired or invalid");
        }

        if (!jwtUtil.isRefreshToken(token)) {
            throw new InvalidTokenException("Provided token is not a refresh token");
        }

        String uuid = jwtUtil.extractUuid(token);

        User user = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new InvalidTokenException("Token refers to a non-existent user"));

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new AccountLockedException("Account is not active");
        }

        log.info("Token refreshed [uuid={}]", uuid);

        String newAccessToken = jwtUtil.generateAccessToken(
                user.getUuid(), user.getEmail(),
                Map.of("fullName", user.getFullName()));

        return AuthResponseDto.builder()
                .success(true)
                .message("Token refreshed successfully")
                .accessToken(newAccessToken)
                .refreshToken(token)
                .accessTokenExpiresIn(jwtUtil.getAccessTokenExpiryMs())
                .refreshTokenExpiresIn(jwtUtil.getRefreshTokenExpiryMs())
                .user(toUserInfoDto(user))
                .build();
    }

    // =========================================================================
    // FORGOT PASSWORD — SEND OTP
    // =========================================================================

    @Override
    @Transactional
    public ApiResponseDto sendForgotPasswordOtp(ForgotPasswordRequestDto request) {
        String email = request.getEmail().toLowerCase().trim();

        // Always return success to prevent user enumeration
        userRepository.findByEmail(email).ifPresent(user -> {
            String otp = otpUtil.generateOtp();

            PasswordResetOtp resetOtp = PasswordResetOtp.builder()
                    .email(email)
                    .otp(passwordEncoder.encode(otp)) // store hashed — never plain text
                    .expiryTime(LocalDateTime.now().plusMinutes(otpExpiryMinutes))
                    .verified(false)
                    .build();

            otpRepository.save(resetOtp);

            // TODO: uncomment after wiring JavaMailSender
            // sendOtpEmail(email, otp, user.getFullName());

            log.info("Forgot-password OTP generated [email={}] otp={}", email, otp); // remove otp log in production
        });

        return ApiResponseDto.builder()
                .success(true)
                .message("If the email is registered, an OTP has been sent.")
                .build();
    }

    // =========================================================================
    // VERIFY OTP
    // =========================================================================

    @Override
    @Transactional
    public ApiResponseDto verifyOtp(VerifyOtpRequestDto request) {

        String email = request.getEmail().toLowerCase().trim();

        PasswordResetOtp otpRecord = otpRepository
                .findTopByEmailOrderByExpiryTimeDesc(email)
                .orElseThrow(() -> new OtpException("No OTP found"));

        validateOtpRecord(otpRecord, request.getOtp());

        otpRecord.setVerified(true);
        otpRepository.save(otpRecord);

        // 🔥 CREATE RESET SESSION TOKEN (important fix)
        String resetToken = jwtUtil.generateResetToken(email);

        return ApiResponseDto.builder()
                .success(true)
                .message("OTP verified")
                .data(Map.of("resetToken", resetToken))
                .build();
    }

    // =========================================================================
    // RESET PASSWORD
    // =========================================================================

    @Override
    @Transactional
    public ApiResponseDto resetPassword(ResetPasswordRequestDto request) {

        String email = request.getEmail().toLowerCase().trim();

        // 🔥 VALIDATE RESET TOKEN (THIS IS THE FIX)
        try {
            if (!jwtUtil.isTokenValid(request.getResetToken())) {
                throw new OtpException("Invalid or expired reset token");
            }
        } catch (Exception e) {
            throw new OtpException("Invalid reset session");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        user.setPasswordChangedAt(LocalDateTime.now());
        user.setFailedLoginAttempts(0);

        if (user.getStatus() == UserStatus.LOCKED) {
            user.setStatus(UserStatus.ACTIVE);
        }

        userRepository.save(user);

        return ApiResponseDto.builder()
                .success(true)
                .message("Password reset successful")
                .build();
    }
    // =========================================================================
    // PRIVATE HELPERS
    // =========================================================================

    private void handleFailedAttempt(User user, String ip) {
        int attempts = user.getFailedLoginAttempts() + 1;
        user.setFailedLoginAttempts(attempts);

        log.warn("Failed login attempt {}/{} [uuid={}] [ip={}]",
                attempts, maxFailedAttempts, user.getUuid(), ip);

        if (attempts >= maxFailedAttempts) {
            user.setStatus(UserStatus.LOCKED);
            log.error("Account LOCKED after {} failed attempts [uuid={}] [ip={}]",
                    attempts, user.getUuid(), ip);
        }

        userRepository.save(user);
    }

    private void validateOtpRecord(PasswordResetOtp record, String rawOtp) {
        if (record.isVerified()) {
            throw new OtpException("OTP has already been used");
        }
        if (record.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new OtpException("OTP has expired. Please request a new one.");
        }
        if (!passwordEncoder.matches(rawOtp, record.getOtp())) {
            throw new OtpException("Invalid OTP");
        }
    }

    private AuthResponseDto buildAuthResponse(User user) {
        Map<String, Object> claims = Map.of(
                "fullName", user.getFullName(),
                "status",   user.getStatus().name()
        );

        String accessToken  = jwtUtil.generateAccessToken(user.getUuid(), user.getEmail(), claims);
        String refreshToken = jwtUtil.generateRefreshToken(user.getUuid(), user.getEmail());

        return AuthResponseDto.builder()
                .success(true)
                .message("Login successful")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpiresIn(jwtUtil.getAccessTokenExpiryMs())
                .refreshTokenExpiresIn(jwtUtil.getRefreshTokenExpiryMs())
                .user(toUserInfoDto(user))
                .build();
    }

    private UserInfoDto toUserInfoDto(User user) {
        return UserInfoDto.builder()
                .uuid(user.getUuid())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .mobile(user.getMobile())
                .status(user.getStatus().name())
                .build();
    }

    // TODO: uncomment and wire JavaMailSender before deployment
    /*
    private void sendOtpEmail(String to, String otp, String fullName) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(mailFrom);
            mail.setTo(to);
            mail.setSubject("Your Password Reset OTP");
            mail.setText(
                "Hi " + fullName + ",\n\n" +
                "Your OTP for password reset is: " + otp + "\n\n" +
                "This OTP is valid for " + otpExpiryMinutes + " minutes.\n" +
                "If you did not request this, please ignore this email.\n\n" +
                "Regards,\nSMS Vari Team"
            );
            mailSender.send(mail);
        } catch (Exception e) {
            log.error("Failed to send OTP email to [{}]: {}", to, e.getMessage());
        }
    }
    */
}