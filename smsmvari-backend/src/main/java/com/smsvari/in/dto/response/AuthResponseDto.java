package com.smsvari.in.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthResponseDto {
    private boolean success;
    private String message;
    private String accessToken;
    private String refreshToken;
    private long accessTokenExpiresIn;  // ms
    private long refreshTokenExpiresIn; // ms
    private UserInfoDto user;
}