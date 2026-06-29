package com.smsvari.in.controller;

import com.smsvari.in.dto.request.CreateEventRequest;
import com.smsvari.in.dto.request.UpdateEventRequest;
import com.smsvari.in.dto.response.ApiResponseDto;
import com.smsvari.in.dto.response.EventListResponse;
import com.smsvari.in.dto.response.EventResponse;
import com.smsvari.in.enums.EventStatus;
import com.smsvari.in.services.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * REST controller for admin-facing Event management.
 *
 * <p>Base URL: {@code /api/admin/events}</p>
 *
 * <p>All endpoints require an authenticated admin — enforced by the JWT security
 * filter and {@code @PreAuthorize("isAuthenticated()")}.</p>
 *
 * <h3>Endpoint summary</h3>
 * <pre>
 *  POST   /api/admin/events                          — create event
 *  PUT    /api/admin/events/{uuid}                   — update event metadata
 *  DELETE /api/admin/events/{uuid}                   — delete event + all media
 *  GET    /api/admin/events/{uuid}                   — get single event (with media)
 *  GET    /api/admin/events                          — list all events
 *  GET    /api/admin/events/by-date                  — list events in a date range
 *  GET    /api/admin/events/category/{category}      — filter by category
 *  GET    /api/admin/events/status/{status}          — filter by status
 *  PATCH  /api/admin/events/{uuid}/featured          — toggle featured flag
 *  PATCH  /api/admin/events/{uuid}/published         — toggle published flag
 *  PATCH  /api/admin/events/{uuid}/status            — manually set lifecycle status (pins it)
 *  PATCH  /api/admin/events/{uuid}/status/auto       — clear manual pin, resume automatic status
 *
 *  POST   /api/admin/events/{uuid}/cover             — upload / replace cover photo
 *  DELETE /api/admin/events/{uuid}/cover             — remove cover photo
 *
 *  GET    /api/admin/events/{uuid}/media             — list gallery media
 *  POST   /api/admin/events/{uuid}/media             — upload gallery images (batch)
 *  PUT    /api/admin/events/{uuid}/media/{mediaUuid} — update caption / order
 *  PATCH  /api/admin/events/{uuid}/media/reorder     — bulk reorder
 *  DELETE /api/admin/events/{uuid}/media/{mediaUuid} — hard-delete media item
 *  PATCH  /api/admin/events/{uuid}/media/{mediaUuid}/toggle — toggle active
 * </pre>
 */
@Slf4j
@RestController
@RequestMapping("/api/admin/events")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class AdminEventController {

    private final EventService eventService;

    // =========================================================================
    // CREATE
    // =========================================================================

    /**
     * Creates a new event.
     * The creator is resolved from the JWT — clients must NOT send {@code createdBy}.
     *
     * @param request validated creation payload
     * @return 201 Created with the new event
     */
    @PostMapping
    public ResponseEntity<ApiResponseDto> createEvent(
            @Valid @RequestBody CreateEventRequest request) {

        EventResponse event = eventService.createEvent(request);
        log.info("Event created via API: uuid={}", event.getUuid());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponseDto.builder()
                        .success(true)
                        .message("Event created successfully")
                        .data(Map.of("event", event))
                        .build());
    }

    // =========================================================================
    // UPDATE
    // =========================================================================

    /**
     * Updates event metadata (patch semantics — only non-null fields are applied).
     * To change the cover image use the dedicated {@code /cover} endpoint.
     *
     * @param uuid    the event's public UUID
     * @param request update payload
     * @return 200 OK with the updated event
     */
    @PutMapping("/{uuid}")
    public ResponseEntity<ApiResponseDto> updateEvent(
            @PathVariable String uuid,
            @Valid @RequestBody UpdateEventRequest request) {

        EventResponse event = eventService.updateEvent(uuid, request);
        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Event updated successfully")
                .data(Map.of("event", event))
                .build());
    }

    // =========================================================================
    // DELETE
    // =========================================================================

    /**
     * Hard-deletes an event, its cover photo, and all gallery media from disk and DB.
     *
     * @param uuid the event's public UUID
     * @return 200 OK with confirmation
     */
    @DeleteMapping("/{uuid}")
    public ResponseEntity<ApiResponseDto> deleteEvent(@PathVariable String uuid) {
        eventService.deleteEvent(uuid);
        log.info("Event deleted via API: uuid={}", uuid);

        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Event deleted successfully")
                .build());
    }

    // =========================================================================
    // READ — single
    // =========================================================================

    /**
     * Returns full details of a single event, including creator info,
     * active media count, and the gallery media list.
     *
     * @param uuid the event's public UUID
     * @return 200 OK with full event detail
     */
    @GetMapping("/{uuid}")
    public ResponseEntity<ApiResponseDto> getEvent(@PathVariable String uuid) {
        EventResponse event = eventService.getEventByUuid(uuid);
        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Event retrieved successfully")
                .data(Map.of("event", event))
                .build());
    }

    // =========================================================================
    // READ — list (all)
    // =========================================================================

    /**
     * Returns all events regardless of published/status state,
     * ordered by start date descending (most recent first).
     *
     * @return 200 OK with list of events
     */
    @GetMapping
    public ResponseEntity<ApiResponseDto> getAllEvents() {
        List<EventListResponse> events = eventService.getAllEvents();
        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Events retrieved successfully")
                .data(Map.of("events", events))
                .build());
    }

    // =========================================================================
    // READ — filter by date range
    // =========================================================================

    /**
     * Returns events whose start date falls within the given range (inclusive).
     *
     * <p>Either parameter may be omitted:</p>
     * <ul>
     *   <li>Only {@code from} — all events on or after that date</li>
     *   <li>Only {@code to}   — all events on or before that date</li>
     *   <li>Neither            — falls back to returning all events</li>
     * </ul>
     *
     * <p>Example: {@code GET /api/admin/events/by-date?from=2026-01-01&to=2026-12-31}</p>
     *
     * @param from start of date window (ISO date, optional)
     * @param to   end   of date window (ISO date, optional)
     * @return 200 OK with matching events
     */
    @GetMapping("/by-date")
    public ResponseEntity<ApiResponseDto> getEventsByDateRange(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {

        List<EventListResponse> events = eventService.getEventsByDateRange(from, to);
        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Events retrieved successfully")
                .data(Map.of("events", events))
                .build());
    }

    // =========================================================================
    // READ — filter by category
    // =========================================================================

    /**
     * Returns all events matching the given category (case-sensitive).
     *
     * @param category the category string
     * @return 200 OK with matching events
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponseDto> getEventsByCategory(
            @PathVariable String category) {

        List<EventListResponse> events = eventService.getEventsByCategory(category);
        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Events by category retrieved successfully")
                .data(Map.of("events", events))
                .build());
    }

    // =========================================================================
    // READ — filter by status
    // =========================================================================

    /**
     * Returns all events matching the given lifecycle status.
     *
     * @param status the target {@link EventStatus}
     * @return 200 OK with matching events
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponseDto> getEventsByStatus(
            @PathVariable EventStatus status) {

        List<EventListResponse> events = eventService.getEventsByStatus(status);
        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Events by status retrieved successfully")
                .data(Map.of("events", events))
                .build());
    }

    // =========================================================================
    // TOGGLE — featured / published
    // =========================================================================

    /**
     * Flips the {@code featured} flag on the event.
     *
     * @param uuid the event's public UUID
     * @return 200 OK with updated event
     */
    @PatchMapping("/{uuid}/featured")
    public ResponseEntity<ApiResponseDto> toggleFeatured(@PathVariable String uuid) {
        EventResponse event = eventService.toggleFeatured(uuid);
        String message = Boolean.TRUE.equals(event.getFeatured())
                ? "Event marked as featured"
                : "Event removed from featured";

        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message(message)
                .data(Map.of("event", event))
                .build());
    }

    /**
     * Flips the {@code published} flag on the event.
     *
     * @param uuid the event's public UUID
     * @return 200 OK with updated event
     */
    @PatchMapping("/{uuid}/published")
    public ResponseEntity<ApiResponseDto> togglePublished(@PathVariable String uuid) {
        EventResponse event = eventService.togglePublished(uuid);
        String message = Boolean.TRUE.equals(event.getPublished())
                ? "Event published successfully"
                : "Event unpublished successfully";

        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message(message)
                .data(Map.of("event", event))
                .build());
    }

    // =========================================================================
    // LIFECYCLE STATUS — manual override / reset to automatic
    // =========================================================================

    /**
     * Manually sets an event's lifecycle status, overriding the automatic
     * date-based calculation (UPCOMING / ONGOING / COMPLETED) and the
     * {@code EventStatusScheduler}'s nightly recalculation.
     *
     * <p>This pins {@code statusOverridden = true} on the event. The status will
     * NOT change again — neither via the scheduler nor via unrelated metadata
     * edits through {@code PUT /{uuid}} — until {@link #resetEventStatusToAutomatic}
     * is called.</p>
     *
     * <p>Example: {@code PATCH /api/admin/events/{uuid}/status?status=CANCELLED}</p>
     *
     * @param uuid   the event's public UUID
     * @param status the lifecycle status to set
     * @return 200 OK with the updated event
     */
    @PatchMapping("/{uuid}/status")
    public ResponseEntity<ApiResponseDto> setEventStatus(
            @PathVariable String uuid,
            @RequestParam EventStatus status) {

        EventResponse event = eventService.setEventStatus(uuid, status);
        log.info("Event status manually set: uuid={}, status={}", uuid, status);

        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Event status updated to " + status)
                .data(Map.of("event", event))
                .build());
    }

    /**
     * Clears a manual status override on an event and immediately recalculates
     * its status from {@code startDate}/{@code endDate}. From this point on, the
     * status will track dates automatically again — both on save and via the
     * nightly {@code EventStatusScheduler} run.
     *
     * @param uuid the event's public UUID
     * @return 200 OK with the updated event
     */
    @PatchMapping("/{uuid}/status/auto")
    public ResponseEntity<ApiResponseDto> resetEventStatusToAutomatic(
            @PathVariable String uuid) {

        EventResponse event = eventService.resetEventStatusToAutomatic(uuid);
        log.info("Event status reset to automatic: uuid={}, status={}", uuid, event.getStatus());

        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Event status reset to automatic calculation")
                .data(Map.of("event", event))
                .build());
    }

    // =========================================================================
    // COVER PHOTO
    // =========================================================================

    /**
     * Uploads (or replaces) the cover photo for an event.
     * The image is converted to WebP, stored on disk, and the old file is deleted.
     *
     * <p>Request: {@code multipart/form-data} with part name {@code file}.</p>
     *
     * @param uuid the event's public UUID
     * @param file image file (JPEG / PNG / WebP / GIF / BMP / TIFF, max 15 MB)
     * @return 200 OK with the public cover URL
     */
    @PostMapping(value = "/{uuid}/cover", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponseDto> uploadCover(
            @PathVariable String uuid,
            @RequestPart("file") MultipartFile file) {

        String coverUrl = eventService.uploadCover(uuid, file);
        log.info("Cover uploaded: eventUuid={}", uuid);

        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Cover photo uploaded successfully")
                .data(Map.of("coverImageUrl", coverUrl))
                .build());
    }

    /**
     * Removes the cover photo from disk and clears {@code event.coverImageUrl}.
     *
     * @param uuid the event's public UUID
     * @return 200 OK with confirmation
     */
    @DeleteMapping("/{uuid}/cover")
    public ResponseEntity<ApiResponseDto> deleteCover(@PathVariable String uuid) {
        eventService.deleteCover(uuid);
        log.info("Cover deleted: eventUuid={}", uuid);

        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Cover photo removed successfully")
                .build());
    }

    // =========================================================================
    // GALLERY MEDIA
    // =========================================================================

    /**
     * Returns all active gallery media for an event, ordered by
     * {@code displayOrder ASC, createdAt ASC}.
     *
     * @param uuid the event's public UUID
     * @return 200 OK with media list
     */
    @GetMapping("/{uuid}/media")
    public ResponseEntity<ApiResponseDto> getMedia(@PathVariable String uuid) {
        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Media retrieved successfully")
                .data(Map.of("media", eventService.getMedia(uuid)))
                .build());
    }

    /**
     * Uploads one or more images to an event's gallery (max 20 files per request).
     * Each image is converted to WebP (main + thumbnail) and appended after
     * the current last item. The uploading admin is recorded on each row.
     *
     * <p>Request: {@code multipart/form-data} with part name {@code files} (repeatable).</p>
     *
     * @param uuid  the event's public UUID
     * @param files one or more image files (max 15 MB each)
     * @return 201 Created with the list of newly created media items
     */
    @PostMapping(value = "/{uuid}/media", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponseDto> uploadMedia(
            @PathVariable String uuid,
            @RequestPart("files") List<MultipartFile> files) {

        var created = eventService.uploadMedia(uuid, files);
        log.info("Media uploaded: eventUuid={}, count={}", uuid, created.size());

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponseDto.builder()
                .success(true)
                .message(created.size() + " media item(s) uploaded successfully")
                .data(Map.of("media", created))
                .build());
    }

    /**
     * Updates the caption and/or display order of a single media item.
     *
     * @param uuid      the event's public UUID
     * @param mediaUuid the media item's public UUID
     * @param request   update payload
     * @return 200 OK with updated media item
     */
    @PutMapping("/{uuid}/media/{mediaUuid}")
    public ResponseEntity<ApiResponseDto> updateMedia(
            @PathVariable String uuid,
            @PathVariable String mediaUuid,
            @Valid @RequestBody com.smsvari.in.dto.request.UpdateMediaRequest request) {

        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Media updated successfully")
                .data(Map.of("media", eventService.updateMedia(uuid, mediaUuid, request)))
                .build());
    }

    /**
     * Bulk-reorders all gallery media for an event.
     * The position of each UUID in {@code orderedUuids} becomes the new {@code displayOrder}.
     *
     * @param uuid    the event's public UUID
     * @param request contains the full ordered list of media UUIDs
     * @return 200 OK with the re-ordered media list
     */
    @PatchMapping("/{uuid}/media/reorder")
    public ResponseEntity<ApiResponseDto> reorderMedia(
            @PathVariable String uuid,
            @Valid @RequestBody com.smsvari.in.dto.request.ReorderMediaRequest request) {

        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Media reordered successfully")
                .data(Map.of("media", eventService.reorderMedia(uuid, request)))
                .build());
    }

    /**
     * Hard-deletes a single gallery media item and removes its WebP files from disk.
     *
     * @param uuid      the event's public UUID
     * @param mediaUuid the media item's public UUID
     * @return 200 OK with confirmation
     */
    @DeleteMapping("/{uuid}/media/{mediaUuid}")
    public ResponseEntity<ApiResponseDto> deleteMedia(
            @PathVariable String uuid,
            @PathVariable String mediaUuid) {

        eventService.deleteMedia(uuid, mediaUuid);
        log.info("Media deleted: eventUuid={}, mediaUuid={}", uuid, mediaUuid);

        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Media deleted successfully")
                .build());
    }

    /**
     * Toggles the {@code active} flag on a gallery media item
     * without removing its file from disk.
     *
     * @param uuid      the event's public UUID
     * @param mediaUuid the media item's public UUID
     * @return 200 OK with updated media item
     */
    @PatchMapping("/{uuid}/media/{mediaUuid}/toggle")
    public ResponseEntity<ApiResponseDto> toggleMedia(
            @PathVariable String uuid,
            @PathVariable String mediaUuid) {

        var updated = eventService.toggleMedia(uuid, mediaUuid);
        String msg = Boolean.TRUE.equals(updated.getActive()) ? "Media activated" : "Media deactivated";

        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message(msg)
                .data(Map.of("media", updated))
                .build());
    }
}