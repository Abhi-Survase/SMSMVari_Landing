package com.smsvari.in.dto.request;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerifyOtpRequestDto {

    @NotBlank
    private String email;

    @NotBlank
    private String otp;

    private String resetToken;
}
