package com.smsvari.in.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ResetPasswordRequestDto {

    @NotBlank
    private String email;

    @NotBlank
    private String otp;

    private String resetToken;

    @NotBlank
    private String newPassword;
}
