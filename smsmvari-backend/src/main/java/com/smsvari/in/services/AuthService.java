package com.smsvari.in.services;

import com.smsvari.in.dto.request.*;
import com.smsvari.in.dto.response.ApiResponseDto;
import com.smsvari.in.dto.response.AuthResponseDto;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {

    /**
     * Authenticates a user with email and password.
     * - Verifies credentials against BCrypt-hashed password
     * - Enforces account lockout after N consecutive failed attempts
     * - Records last-login timestamp and client IP on success
     * - Returns signed access + refresh JWTs on success
     *
     * @param request     email + password payload
     * @param httpRequest raw servlet request for IP extraction
     * @return JWT tokens + user info
     */
    AuthResponseDto login(LoginRequestDto request, HttpServletRequest httpRequest);

    /**
     * Issues a fresh access token from a valid, unexpired refresh token.
     * - Validates token signature and expiry
     * - Confirms token type is "refresh" (not "access")
     * - Verifies the referenced user still exists and is ACTIVE
     * - Refresh token itself is NOT rotated (stateless design)
     *
     * @param request refresh token payload
     * @return new access token + same refresh token
     */
    AuthResponseDto refreshToken(RefreshTokenRequestDto request);

    /**
     * Sends a time-limited OTP to the user's registered email address.
     * - Always returns HTTP 200 regardless of whether email exists (prevents user enumeration)
     * - OTP is BCrypt-hashed before persistence
     * - Previous OTPs for the same email are superseded by the newest record
     *
     * @param request registered email address
     * @return generic success message
     */
    ApiResponseDto sendForgotPasswordOtp(ForgotPasswordRequestDto request);

    /**
     * Validates the OTP without resetting the password (step 2 of 3-step flow).
     * - Checks OTP expiry and hash match
     * - Marks OTP record as verified so the reset step skips re-validation
     *
     * @param request email + raw OTP
     * @return success or descriptive error (expired / invalid / already used)
     */
    ApiResponseDto verifyOtp(VerifyOtpRequestDto request);

    /**
     * Resets the user's password after OTP verification.
     * - Accepts pre-verified OTP (via verifyOtp) or re-validates inline
     * - BCrypt-encodes and persists the new password
     * - Records passwordChangedAt timestamp
     * - Automatically unlocks accounts that were LOCKED due to failed attempts
     * - Deletes the consumed OTP record
     *
     * @param request email + otp + newPassword
     * @return success confirmation
     */
    ApiResponseDto resetPassword(ResetPasswordRequestDto request);

    ApiResponseDto logout(LogoutRequestDto request);
    ApiResponseDto logoutAll(String userUuid);
}