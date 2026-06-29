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
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDto> refresh(
            @Valid @RequestBody RefreshTokenRequestDto request) {

        AuthResponseDto response = authService.refreshToken(request);
        return ResponseEntity.ok(response);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/v1/auth/logout
    // ─────────────────────────────────────────────────────────────────────────
    /**
     * Revokes the supplied refresh token, ending that single session/device.
     * Deliberately does NOT require a valid access token — a user should be
     * able to log out even if their access token already expired, as long
     * as they still hold the refresh token to invalidate. Must stay
     * permitAll() in SecurityConfig for that reason. Idempotent.
     */
    @PostMapping("/logout")
    public ResponseEntity<ApiResponseDto> logout(
            @Valid @RequestBody LogoutRequestDto request) {

        ApiResponseDto response = authService.logout(request);
        return ResponseEntity.ok(response);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/v1/auth/logout-all   (protected – requires valid access token)
    // ─────────────────────────────────────────────────────────────────────────
    /**
     * Revokes every refresh token belonging to the authenticated user —
     * "log out of all devices". Requires a valid access token so an
     * attacker can't mass-revoke an arbitrary user's sessions by uuid.
     */
    @PostMapping("/logout-all")
    public ResponseEntity<ApiResponseDto> logoutAll(
            org.springframework.security.core.Authentication authentication) {

        String userUuid = authentication.getName();
        ApiResponseDto response = authService.logoutAll(userUuid);
        return ResponseEntity.ok(response);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/v1/auth/forgot-password
    // ─────────────────────────────────────────────────────────────────────────
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponseDto> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequestDto request) {

        ApiResponseDto response = authService.sendForgotPasswordOtp(request);
        return ResponseEntity.ok(response);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/v1/auth/verify-otp
    // ─────────────────────────────────────────────────────────────────────────
    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponseDto> verifyOtp(
            @Valid @RequestBody VerifyOtpRequestDto request) {

        ApiResponseDto response = authService.verifyOtp(request);
        return ResponseEntity.ok(response);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/v1/auth/reset-password
    // ─────────────────────────────────────────────────────────────────────────
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponseDto> resetPassword(
            @Valid @RequestBody ResetPasswordRequestDto request) {

        ApiResponseDto response = authService.resetPassword(request);
        return ResponseEntity.ok(response);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/v1/auth/me   (protected – requires valid access token)
    // ─────────────────────────────────────────────────────────────────────────
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