package com.smsvari.in.services;

import com.smsvari.in.dto.request.ReorderMediaRequest;
import com.smsvari.in.dto.request.UpdateMediaRequest;
import com.smsvari.in.dto.response.EventMediaResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Contract for event media gallery and cover-photo management.
 *
 * <p>All uploaded images are converted to WebP (main + thumbnail) using
 * {@link ImageProcessingService} before being stored on disk.  The uploading
 * admin is resolved from the Spring Security context and persisted on every
 * {@link com.smsvari.in.entity.EventMedia} record.</p>
 */
public interface EventMediaService {

    // ── Cover photo ──────────────────────────────────────────────────────────

    /**
     * Uploads (or replaces) the cover photo for an event.
     * Converts to WebP, stores on disk, and updates {@code event.coverImageUrl}.
     *
     * @param eventUuid the event's public UUID
     * @param file      the image file (JPEG / PNG / WebP / GIF / BMP / TIFF)
     * @return public URL of the stored WebP cover image
     */
    String uploadCover(String eventUuid, MultipartFile file);

    /**
     * Removes the cover photo from disk and clears {@code event.coverImageUrl}.
     *
     * @param eventUuid the event's public UUID
     */
    void deleteCover(String eventUuid);

    // ── Media gallery — read ─────────────────────────────────────────────────

    /**
     * Returns all active media items for an event, ordered by
     * {@code displayOrder ASC, createdAt ASC}.
     *
     * @param eventUuid the event's public UUID
     * @return ordered list of active media responses
     */
    List<EventMediaResponse> getMedia(String eventUuid);

    // ── Media gallery — write ────────────────────────────────────────────────

    /**
     * Uploads one or more image files to an event's gallery.
     * Each file is converted to WebP (main + thumbnail) and appended after
     * the current last item.
     *
     * @param eventUuid the event's public UUID
     * @param files     one or more image files (max 20 per call, 15 MB each)
     * @return list of created media responses
     */
    List<EventMediaResponse> uploadMedia(String eventUuid, List<MultipartFile> files);

    /**
     * Updates the caption and/or display order of a single media item.
     *
     * @param eventUuid the event's public UUID
     * @param mediaUuid the media item's public UUID
     * @param request   update payload
     * @return updated media response
     */
    EventMediaResponse updateMedia(String eventUuid, String mediaUuid, UpdateMediaRequest request);

    /**
     * Bulk-reorders all media for an event by accepting a full ordered list of UUIDs.
     * The position of each UUID in the list becomes its new {@code displayOrder}.
     *
     * @param eventUuid the event's public UUID
     * @param request   contains {@code orderedUuids}
     * @return re-ordered media list
     */
    List<EventMediaResponse> reorderMedia(String eventUuid, ReorderMediaRequest request);

    /**
     * Hard-deletes a media item — removes the file (and thumbnail) from disk and
     * the row from the database.
     *
     * @param eventUuid the event's public UUID
     * @param mediaUuid the media item's public UUID
     */
    void deleteMedia(String eventUuid, String mediaUuid);

    /**
     * Toggles the {@code active} flag on a media item without removing its file
     * (useful for temporarily hiding an item without losing it).
     *
     * @param eventUuid the event's public UUID
     * @param mediaUuid the media item's public UUID
     * @return updated media response
     */
    EventMediaResponse toggleMedia(String eventUuid, String mediaUuid);
}