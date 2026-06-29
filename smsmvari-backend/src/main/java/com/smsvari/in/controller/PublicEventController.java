package com.smsvari.in.controller;

import com.smsvari.in.dto.response.ApiResponseDto;
import com.smsvari.in.dto.response.EventListResponse;
import com.smsvari.in.dto.response.EventResponse;
import com.smsvari.in.services.EventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Public-facing REST controller for Events.
 *
 * <p>Base URL: {@code /api/events}</p>
 *
 * <p>All endpoints are unauthenticated — they only surface <em>published</em> events
 * and active media so drafts / unpublished records are never exposed.</p>
 *
 * <h3>Endpoint summary</h3>
 * <pre>
 *  GET /api/events                          — all published events (UPCOMING first)
 *  GET /api/events/featured                 — featured published events
 *  GET /api/events/upcoming                 — upcoming events only
 *  GET /api/events/ongoing                  — ongoing events only
 *  GET /api/events/past                     — completed events only
 *  GET /api/events/category/{category}      — published events by category (UPCOMING first)
 *  GET /api/events/categories               — distinct category list
 *  GET /api/events/{slug}                   — single event detail with gallery photos
 * </pre>
 */
@Slf4j
@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class PublicEventController {

    private final EventService eventService;

    // =========================================================================
    // All published events — UPCOMING first, then ONGOING, then COMPLETED
    // =========================================================================

    /**
     * Returns all published events with status-priority ordering:
     * <ol>
     *   <li>UPCOMING  — sorted by startDate ASC (soonest first)</li>
     *   <li>ONGOING   — sorted by startDate ASC</li>
     *   <li>COMPLETED — sorted by startDate DESC (most recent first)</li>
     * </ol>
     *
     * @return 200 OK with ordered list of published events
     */
    @GetMapping
    public ResponseEntity<ApiResponseDto> getAllPublishedEvents() {
        List<EventListResponse> events = eventService.getPublishedEventsSorted();
        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Events retrieved successfully")
                .data(Map.of("events", events))
                .build());
    }

    // =========================================================================
    // Featured
    // =========================================================================

    /**
     * Returns published events marked as featured, UPCOMING first.
     *
     * @return 200 OK with featured events
     */
    @GetMapping("/featured")
    public ResponseEntity<ApiResponseDto> getFeaturedEvents() {
        List<EventListResponse> events = eventService.getFeaturedEvents();
        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Featured events retrieved successfully")
                .data(Map.of("events", events))
                .build());
    }

    // =========================================================================
    // By lifecycle status
    // =========================================================================

    /**
     * Returns all published UPCOMING events, sorted by startDate ascending
     * (nearest event first).
     *
     * @return 200 OK with upcoming events
     */
    @GetMapping("/upcoming")
    public ResponseEntity<ApiResponseDto> getUpcomingEvents() {
        List<EventListResponse> events = eventService.getPublishedUpcomingEvents();
        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Upcoming events retrieved successfully")
                .data(Map.of("events", events))
                .build());
    }

    /**
     * Returns all published ONGOING events.
     *
     * @return 200 OK with ongoing events
     */
    @GetMapping("/ongoing")
    public ResponseEntity<ApiResponseDto> getOngoingEvents() {
        List<EventListResponse> events = eventService.getPublishedOngoingEvents();
        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Ongoing events retrieved successfully")
                .data(Map.of("events", events))
                .build());
    }

    /**
     * Returns all published COMPLETED events, most recent first.
     *
     * @return 200 OK with past events
     */
    @GetMapping("/past")
    public ResponseEntity<ApiResponseDto> getPastEvents() {
        List<EventListResponse> events = eventService.getPublishedCompletedEvents();
        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Past events retrieved successfully")
                .data(Map.of("events", events))
                .build());
    }

    // =========================================================================
    // Category filtering
    // =========================================================================

    /**
     * Returns published events in the given category with status-priority ordering
     * (UPCOMING first, then ONGOING, then COMPLETED).
     *
     * @param category the category string (case-sensitive)
     * @return 200 OK with matching published events
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponseDto> getEventsByCategory(
            @PathVariable String category) {

        List<EventListResponse> events = eventService.getPublishedEventsByCategory(category);
        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Events for category '" + category + "' retrieved successfully")
                .data(Map.of("events", events))
                .build());
    }

    /**
     * Returns the distinct list of categories that have at least one published event.
     * Useful for rendering a dynamic category filter in the UI.
     *
     * @return 200 OK with list of category strings
     */
    @GetMapping("/categories")
    public ResponseEntity<ApiResponseDto> getCategories() {
        List<String> categories = eventService.getPublishedCategories();
        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Categories retrieved successfully")
                .data(Map.of("categories", categories))
                .build());
    }

    // =========================================================================
    // Single event detail — includes gallery photos
    // =========================================================================

    /**
     * Returns full public detail for a single published event, including:
     * <ul>
     *   <li>Cover photo URL</li>
     *   <li>All active gallery media (ordered by displayOrder)</li>
     *   <li>Creator name (not email, for privacy)</li>
     * </ul>
     *
     * <p>Returns 404 if the event does not exist or is not published.</p>
     *
     * @param slug the event's URL slug (e.g. {@code medical-camp-2026})
     * @return 200 OK with full event detail
     */
    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponseDto> getEventBySlug(@PathVariable String slug) {
        EventResponse event = eventService.getPublishedEventBySlug(slug);
        return ResponseEntity.ok(ApiResponseDto.builder()
                .success(true)
                .message("Event retrieved successfully")
                .data(Map.of("event", event))
                .build());
    }
}