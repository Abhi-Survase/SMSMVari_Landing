package com.smsvari.in.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

/**
 * Request payload for updating an existing event.
 * All fields are optional — only non-null fields are applied (patch semantics).
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateEventRequest {

    @Size(min = 3, max = 255, message = "Title must be between 3 and 255 characters")
    private String title;

    @Size(max = 5000, message = "Description must not exceed 5000 characters")
    private String description;

    @Size(max = 100, message = "Category must not exceed 100 characters")
    private String category;

    @Size(max = 500, message = "Cover image URL must not exceed 500 characters")
    private String coverImageUrl;

    @Size(max = 255, message = "Location must not exceed 255 characters")
    private String location;

    private LocalDate startDate;

    private LocalDate endDate;

    private Boolean featured;

    private Boolean published;
}
