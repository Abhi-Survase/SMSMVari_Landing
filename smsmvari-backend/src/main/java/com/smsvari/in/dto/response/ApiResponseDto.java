package com.smsvari.in.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class ApiResponseDto {

    private boolean success;
    private String message;
    private Map<String, Object> data;
}

