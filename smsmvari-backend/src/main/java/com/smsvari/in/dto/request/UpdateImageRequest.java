package com.smsvari.in.dto.request;

import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateImageRequest {

    private String categoryUuid;   // null = keep current; empty string = remove category

    private Boolean featured;

    private Boolean active;

    @Min(value = 0, message = "Display order must be >= 0")
    private Integer displayOrder;
}