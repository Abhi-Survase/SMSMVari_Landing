package com.smsvari.in.dto.response;

import com.smsvari.in.enums.EventStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Full detail response for a single event (admin detail view).
 * Includes creator info and active media count.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventResponse {

    private String      uuid;
    private String      title;
    private String      slug;
    private String      description;
    private String      category;

    /** Public URL of the cover WebP image. */
    private String      coverImageUrl;

    private String      location;
    private EventStatus status;
    private Boolean     featured;
    private Boolean     published;
    private LocalDate   startDate;
    private LocalDate   endDate;
    private List<EventMediaResponse> media;

    // ── creator audit ─────────────────────────────────────────────────────────

    /** Full name of the admin who created this event. */
    private String        createdByName;

    /** Email of the admin who created this event. */
    private String        createdByEmail;

    // ── timestamps ────────────────────────────────────────────────────────────

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // ── derived ───────────────────────────────────────────────────────────────

    /** Number of active media items currently attached to this event. */
    private int mediaCount;
}