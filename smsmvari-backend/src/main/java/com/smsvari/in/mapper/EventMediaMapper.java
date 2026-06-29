package com.smsvari.in.mapper;

import com.smsvari.in.dto.response.EventMediaResponse;
import com.smsvari.in.entity.EventMedia;
import org.springframework.stereotype.Component;

/**
 * Manual mapper that converts {@link EventMedia} entities into response DTOs.
 */
@Component
public class EventMediaMapper {

    /**
     * Maps an {@link EventMedia} entity to {@link EventMediaResponse}.
     *
     * <p>The entity's {@code uploadedBy} association must be loaded before calling
     * this method (it is accessed eagerly here via Lombok getters — if the session
     * is closed you'll get a {@code LazyInitializationException}).  All service
     * methods that return media responses run inside a {@code @Transactional}
     * boundary, so this is safe in normal usage.</p>
     *
     * @param media the entity (must have {@code uploadedBy} initialised)
     * @return populated response DTO
     */
    public EventMediaResponse toResponse(EventMedia media) {
        return EventMediaResponse.builder()
                .uuid(media.getUuid())
                // file
                .fileUrl(media.getFileUrl())
                .thumbnailUrl(media.getThumbnailUrl())
                .originalFileName(media.getOriginalFileName())
                .mimeType(media.getMimeType())
                .fileSize(media.getFileSize())
                .width(media.getWidth())
                .height(media.getHeight())
                // display
                .caption(media.getCaption())
                .displayOrder(media.getDisplayOrder())
                .active(media.getActive())
                // audit
                .uploadedByName(media.getUploadedBy().getFullName())
                .uploadedByEmail(media.getUploadedBy().getEmail())
                .createdAt(media.getCreatedAt())
                .build();
    }
}