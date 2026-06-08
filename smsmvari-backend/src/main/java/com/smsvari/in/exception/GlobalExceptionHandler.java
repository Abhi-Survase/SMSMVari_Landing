package com.smsvari.in.exception;

import com.smsvari.in.dto.response.ApiResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // ─── Validation errors ────────────────────────────────────────────────────
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String field = ((FieldError) error).getField();
            fieldErrors.put(field, error.getDefaultMessage());
        });
        Map<String, Object> body = new HashMap<>();
        body.put("success", false);
        body.put("message", "Validation failed");
        body.put("errors", fieldErrors);
        return ResponseEntity.badRequest().body(body);
    }

    // ─── Account locked ───────────────────────────────────────────────────────
    @ExceptionHandler(AccountLockedException.class)
    public ResponseEntity<ApiResponseDto> handleLocked(AccountLockedException ex) {
        return ResponseEntity.status(HttpStatus.LOCKED)
                .body(ApiResponseDto.builder().success(false).message(ex.getMessage()).build());
    }

    // ─── Bad credentials ──────────────────────────────────────────────────────
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponseDto> handleBadCreds(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponseDto.builder().success(false).message(ex.getMessage()).build());
    }

    // ─── User not found ───────────────────────────────────────────────────────
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponseDto> handleNotFound(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponseDto.builder().success(false).message(ex.getMessage()).build());
    }

    // ─── OTP errors ───────────────────────────────────────────────────────────
    @ExceptionHandler(OtpException.class)
    public ResponseEntity<ApiResponseDto> handleOtp(OtpException ex) {
        return ResponseEntity.badRequest()
                .body(ApiResponseDto.builder().success(false).message(ex.getMessage()).build());
    }

    // ─── Invalid token ────────────────────────────────────────────────────────
    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ApiResponseDto> handleInvalidToken(InvalidTokenException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponseDto.builder().success(false).message(ex.getMessage()).build());
    }

    // ─── Catch-all ────────────────────────────────────────────────────────────
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponseDto> handleGeneric(Exception ex) {
        log.error("Unhandled exception", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponseDto.builder().success(false).message("An unexpected error occurred").build());
    }
}