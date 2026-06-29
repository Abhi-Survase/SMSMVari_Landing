package com.smsvari.in.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReorderImagesRequest {

    @NotNull(message = "Items list is required")
    private List<ImageOrderItem> items;

    @Getter
    @Setter
    public static class ImageOrderItem {

        @NotBlank(message = "Image UUID is required")
        private String uuid;

        @NotNull(message = "Display order is required")
        @Min(value = 0, message = "Display order must be >= 0")
        private Integer displayOrder;
    }
}