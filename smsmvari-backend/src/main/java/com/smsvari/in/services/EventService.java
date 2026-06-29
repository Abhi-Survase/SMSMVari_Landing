package com.smsvari.in.services;

import com.smsvari.in.dto.request.CreateEventRequest;
import com.smsvari.in.dto.request.ReorderMediaRequest;
import com.smsvari.in.dto.request.UpdateEventRequest;
import com.smsvari.in.dto.request.UpdateMediaRequest;
import com.smsvari.in.dto.response.EventListResponse;
import com.smsvari.in.dto.response.EventMediaResponse;
import com.smsvari.in.dto.response.EventResponse;
import com.smsvari.in.enums.EventStatus;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

/**
 * Service contract for event management (both admin and public surfaces).
 */
public interface EventService {

    // ── Admin: CRUD ──────────────────────────────────────────────────────────

    /** Creates a new event. Creator resolved from JWT. */
    EventResponse createEvent(CreateEventRequest request);

    /** Patches an existing event (non-null fields only). */
    EventResponse updateEvent(String eventUuid, UpdateEventRequest request);

    /** Hard-deletes an event plus all its media files from disk and DB. */
    void deleteEvent(String eventUuid);

    /** Returns full admin detail for an event by UUID. */
    EventResponse getEventByUuid(String eventUuid);

    // ── Admin: listings ──────────────────────────────────────────────────────

    /** Returns all events (published + unpublished), start date desc. */
    List<EventListResponse> getAllEvents();

    /**
     * Returns events whose startDate falls within [from, to] (either bound optional).
     * Results ordered start date desc.
     */
    List<EventListResponse> getEventsByDateRange(LocalDate from, LocalDate to);

    /** Returns all events matching the given category. */
    List<EventListResponse> getEventsByCategory(String category);

    /** Returns all events with the given lifecycle status. */
    List<EventListResponse> getEventsByStatus(EventStatus status);

    // ── Admin: toggles ───────────────────────────────────────────────────────

    /** Flips the featured flag. */
    EventResponse toggleFeatured(String eventUuid);

    /** Flips the published flag. */
    EventResponse togglePublished(String eventUuid);

    // ── Admin: cover photo ───────────────────────────────────────────────────

    /**
     * Converts {@code file} to WebP, stores it, deletes the old cover if present,
     * updates {@code event.coverImageUrl} and returns the public URL.
     */
    String uploadCover(String eventUuid, MultipartFile file);

    /** Deletes the cover WebP from disk and clears {@code event.coverImageUrl}. */
    void deleteCover(String eventUuid);

    // ── Admin: gallery media ─────────────────────────────────────────────────

    /** Returns active media for an event, ordered by displayOrder / createdAt. */
    List<EventMediaResponse> getMedia(String eventUuid);

    /**
     * Converts each file to WebP (main + thumbnail), stores them, creates
     * EventMedia rows with the uploader set from JWT, and returns the new items.
     */
    List<EventMediaResponse> uploadMedia(String eventUuid, List<MultipartFile> files);

    /** Updates caption / displayOrder on a single media item. */
    EventMediaResponse updateMedia(String eventUuid, String mediaUuid, UpdateMediaRequest request);

    /** Bulk-reorders media by the supplied UUID order. */
    List<EventMediaResponse> reorderMedia(String eventUuid, ReorderMediaRequest request);

    /** Hard-deletes a media item (files from disk + DB row). */
    void deleteMedia(String eventUuid, String mediaUuid);

    /** Toggles the active flag on a media item without removing its file. */
    EventMediaResponse toggleMedia(String eventUuid, String mediaUuid);

    // ── Public: listings ─────────────────────────────────────────────────────

    /**
     * Returns all published events with status-priority ordering:
     * UPCOMING (startDate ASC) → ONGOING (startDate ASC) → COMPLETED (startDate DESC).
     */
    List<EventListResponse> getPublishedEventsSorted();

    /** Returns published + featured events, UPCOMING first. */
    List<EventListResponse> getFeaturedEvents();

    /** Returns published UPCOMING events, startDate ASC. */
    List<EventListResponse> getPublishedUpcomingEvents();

    /** Returns published ONGOING events, startDate ASC. */
    List<EventListResponse> getPublishedOngoingEvents();

    /** Returns published COMPLETED events, startDate DESC. */
    List<EventListResponse> getPublishedCompletedEvents();

    /**
     * Returns published events in a category with status-priority ordering
     * (UPCOMING first, then ONGOING, then COMPLETED).
     */
    List<EventListResponse> getPublishedEventsByCategory(String category);

    /** Returns distinct category strings that have ≥1 published event. */
    List<String> getPublishedCategories();

    /**
     * Returns full public detail for a published event looked up by slug.
     * Throws {@link com.smsvari.in.exception.EventNotFoundException} if not found
     * or not published.
     */
    EventResponse getPublishedEventBySlug(String slug);

    void recalculateEventStatuses();
    EventResponse setEventStatus(String eventUuid, EventStatus status);
    EventResponse resetEventStatusToAutomatic(String eventUuid);
}