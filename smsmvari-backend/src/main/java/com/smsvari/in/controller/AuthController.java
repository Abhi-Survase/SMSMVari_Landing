package com.smsvari.in.controller;

import com.smsvari.in.dto.request.*;
import com.smsvari.in.dto.response.ApiResponseDto;
import com.smsvari.in.dto.response.AuthResponseDto;
import com.smsvari.in.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/v1/auth/login
    // ─────────────────────────────────────────────────────────────────────────
    /**
     * Authenticates a user.
     * - Validates credentials
     * - Enforces account lockout after N failed attempts
     * - Records last-login IP
     * - Returns access + refresh JWTs on success
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(
            @Valid @RequestBody LoginRequestDto request,
            HttpServletRequest httpRequest) {

        AuthResponseDto response = authService.login(request, httpRequest);
        return ResponseEntity.ok(response);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/v1/auth/refresh
    // ─────────────────────────────────────────────────────────────────────────
    /**
     * Issues a new access token from a valid refresh token.
     * The refresh token itself is not rotated (stateless design).
     */
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDto> refresh(
            @Valid @RequestBody RefreshTokenRequestDto request) {

        AuthResponseDto response = authService.refreshToken(request);
        return ResponseEntity.ok(response);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/v1/auth/forgot-password
    // ─────────────────────────────────────────────────────────────────────────
    /**
     * Triggers OTP email for password reset.
     * Always returns 200 to prevent user enumeration.
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponseDto> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequestDto request) {

        ApiResponseDto response = authService.sendForgotPasswordOtp(request);
        return ResponseEntity.ok(response);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/v1/auth/verify-otp
    // ─────────────────────────────────────────────────────────────────────────
    /**
     * Verifies the OTP (step 2 of 3-step password reset flow).
     * Marks OTP as verified so the reset step doesn't require re-validation.
     */
    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponseDto> verifyOtp(
            @Valid @RequestBody VerifyOtpRequestDto request) {

        ApiResponseDto response = authService.verifyOtp(request);
        return ResponseEntity.ok(response);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/v1/auth/reset-password
    // ─────────────────────────────────────────────────────────────────────────
    /**
     * Resets the password after OTP verification.
     * Also unlocks accounts that were locked due to failed login attempts.
     */
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponseDto> resetPassword(
            @Valid @RequestBody ResetPasswordRequestDto request) {

        ApiResponseDto response = authService.resetPassword(request);
        return ResponseEntity.ok(response);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/v1/auth/me   (protected – requires valid access token)
    // ─────────────────────────────────────────────────────────────────────────
    /**
     * Returns the UUID of the currently authenticated user.
     * Useful for frontend token validation checks.
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponseDto> me(
            org.springframework.security.core.Authentication authentication) {

        return ResponseEntity.ok(
                ApiResponseDto.builder()
                        .success(true)
                        .message("Authenticated as: " + authentication.getPrincipal())
                        .build()
        );
    }
}