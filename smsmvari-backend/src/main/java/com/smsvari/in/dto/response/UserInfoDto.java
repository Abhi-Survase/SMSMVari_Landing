package com.smsvari.in.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfoDto {
    private String uuid;
    private String fullName;
    private String email;
    private String mobile;
    private String status;
    private Boolean isAdmin;
}