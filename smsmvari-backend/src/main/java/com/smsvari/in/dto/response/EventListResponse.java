package com.smsvari.in.dto.response;

import com.smsvari.in.enums.EventStatus;
import lombok.*;

import java.time.LocalDate;

/**
 * Lightweight event summary used for list/grid views.
 * Omits heavy fields like description and media details.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventListResponse {

    private String uuid;
    private String title;
    private String slug;
    private String coverImageUrl;
    private String category;
    private String location;
    private EventStatus status;
    private Boolean featured;
    private Boolean published;
    private LocalDate startDate;
    private LocalDate endDate;
}