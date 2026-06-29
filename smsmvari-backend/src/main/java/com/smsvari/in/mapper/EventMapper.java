package com.smsvari.in.mapper;

import com.smsvari.in.dto.response.EventListResponse;
import com.smsvari.in.dto.response.EventMediaResponse;
import com.smsvari.in.dto.response.EventResponse;
import com.smsvari.in.entity.Event;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Manual mapper that converts {@link Event} entities into response DTOs.
 * Uses no MapStruct/ModelMapper dependency — fully explicit for predictability.
 */
@Component
public class EventMapper {

    /**
     * Maps an {@link Event} to a full {@link EventResponse} (detail view).
     * Includes creator info and media count.
     *
     * @param event       the event entity (must have createdBy loaded)
     * @param mediaCount  number of active media items attached
     * @return populated EventResponse
     */
    public EventResponse toEventResponse(Event event, int mediaCount) {
        return toEventResponse(event, mediaCount, java.util.Collections.emptyList());
    }

    public EventResponse toEventResponse(Event event, int mediaCount, List<EventMediaResponse> media) {
        return EventResponse.builder()
                .uuid(event.getUuid())
                .title(event.getTitle())
                .slug(event.getSlug())
                .description(event.getDescription())
                .category(event.getCategory())
                .coverImageUrl(event.getCoverImageUrl())
                .location(event.getLocation())
                .status(event.getStatus())
                .featured(event.getFeatured())
                .published(event.getPublished())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .createdAt(event.getCreatedAt())
                .updatedAt(event.getUpdatedAt())
                .createdByName(event.getCreatedBy().getFullName())
                .createdByEmail(event.getCreatedBy().getEmail())
                .mediaCount(mediaCount)
                .media(media)                 // ← new field
                .build();
    }

    /**
     * Maps an {@link Event} to a lightweight {@link EventListResponse} (list/grid view).
     *
     * <p>Includes {@code published} so admin UIs can correctly distinguish drafts
     * from live events, and {@code slug} so public-facing UIs can link directly
     * to {@code GET /api/events/{slug}} without a second lookup.</p>
     *
     * @param event the event entity
     * @return populated EventListResponse
     */
    public EventListResponse toEventListResponse(Event event) {
        return EventListResponse.builder()
                .uuid(event.getUuid())
                .title(event.getTitle())
                .slug(event.getSlug())
                .coverImageUrl(event.getCoverImageUrl())
                .category(event.getCategory())
                .location(event.getLocation())
                .status(event.getStatus())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .featured(event.getFeatured())
                .published(event.getPublished())
                .build();
    }
}