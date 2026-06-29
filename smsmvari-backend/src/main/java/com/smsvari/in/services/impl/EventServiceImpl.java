package com.smsvari.in.services.impl;

import com.smsvari.in.dto.request.CreateEventRequest;
import com.smsvari.in.dto.request.ReorderMediaRequest;
import com.smsvari.in.dto.request.UpdateEventRequest;
import com.smsvari.in.dto.request.UpdateMediaRequest;
import com.smsvari.in.dto.response.EventListResponse;
import com.smsvari.in.dto.response.EventMediaResponse;
import com.smsvari.in.dto.response.EventResponse;
import com.smsvari.in.entity.Event;
import com.smsvari.in.entity.User;
import com.smsvari.in.enums.EventStatus;
import com.smsvari.in.exception.EventNotFoundException;
import com.smsvari.in.mapper.EventMapper;
import com.smsvari.in.repository.EventMediaRepository;
import com.smsvari.in.repository.EventRepository;
import com.smsvari.in.repository.UserRepository;
import com.smsvari.in.services.EventMediaService;
import com.smsvari.in.services.EventService;
import com.smsvari.in.services.ImageProcessingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Production implementation of {@link EventService}.
 *
 * Public listings use a three-bucket sort:
 *   UPCOMING (startDate ASC) -> ONGOING (startDate ASC) -> COMPLETED (startDate DESC)
 * assembled by merging three separate queries so each bucket keeps its own sort direction.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository        eventRepository;
    private final EventMediaRepository   eventMediaRepository;
    private final EventMapper            eventMapper;
    private final UserRepository         userRepository;
    private final ImageProcessingService imageProcessingService;
    private final EventMediaService      eventMediaService;

    // =========================================================================
    // Admin: CRUD
    // =========================================================================

    @Override
    @Transactional
    public EventResponse createEvent(CreateEventRequest request) {
        User creator = getAuthenticatedUser();
        validateDateRange(request.getStartDate(), request.getEndDate());

        Event event = Event.builder()
                .title(request.getTitle())
                .slug(generateUniqueSlug(request.getTitle()))
                .description(request.getDescription())
                .category(request.getCategory())
                .location(request.getLocation())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .featured(request.getFeatured()   != null ? request.getFeatured()  : false)
                .published(request.getPublished() != null ? request.getPublished() : true)
                .createdBy(creator)
                .build();

        event.setStatus(calculateStatus(request.getStartDate(), request.getEndDate()));

        Event saved = eventRepository.save(event);
        log.info("Event created: uuid={}, slug={}, createdBy={}", saved.getUuid(), saved.getSlug(), creator.getEmail());
        return toDetailResponse(saved);
    }

    @Override
    @Transactional
    public EventResponse updateEvent(String eventUuid, UpdateEventRequest request) {
        Event event = findEventByUuid(eventUuid);

        if (request.getTitle() != null && !request.getTitle().equals(event.getTitle())) {
            event.setTitle(request.getTitle());
            event.setSlug(generateUniqueSlugExcluding(request.getTitle(), event.getSlug()));
        }
        if (request.getDescription()  != null) event.setDescription(request.getDescription());
        if (request.getCategory()     != null) event.setCategory(request.getCategory());
        if (request.getLocation()     != null) event.setLocation(request.getLocation());
        if (request.getStartDate()    != null) event.setStartDate(request.getStartDate());
        if (request.getEndDate()      != null) event.setEndDate(request.getEndDate());
        if (request.getFeatured()     != null) event.setFeatured(request.getFeatured());
        if (request.getPublished()    != null) event.setPublished(request.getPublished());

        validateDateRange(event.getStartDate(), event.getEndDate());

        if (event.getStatus() != EventStatus.CANCELLED
                && !Boolean.TRUE.equals(event.getStatusOverridden())) {
            event.setStatus(calculateStatus(event.getStartDate(), event.getEndDate()));
        }

        Event updated = eventRepository.save(event);
        log.info("Event updated: uuid={}", eventUuid);
        return toDetailResponse(updated);
    }

    @Override
    @Transactional
    public void deleteEvent(String eventUuid) {
        Event event = findEventByUuid(eventUuid);

        // Clean up gallery media files from disk before JPA cascade removes rows
        eventMediaRepository.findAllByEventOrderByDisplayOrderAsc(event)
                .forEach(m -> imageProcessingService.delete(
                        m.getStoredFileName(),
                        m.getThumbnailFileName()
                ));

        // Clean up cover photo
        if (event.getCoverStoredFileName() != null) {
            imageProcessingService.delete(event.getCoverStoredFileName(), null);
        }

        eventRepository.delete(event);
        log.info("Event deleted: uuid={}", eventUuid);
    }

    @Override
    @Transactional(readOnly = true)
    public EventResponse getEventByUuid(String eventUuid) {
        return toDetailResponse(findEventByUuid(eventUuid));
    }

    // =========================================================================
    // Admin: listings
    // =========================================================================

    @Override
    @Transactional(readOnly = true)
    public List<EventListResponse> getAllEvents() {
        return eventRepository.findAllByOrderByStartDateDesc()
                .stream().map(eventMapper::toEventListResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventListResponse> getEventsByDateRange(LocalDate from, LocalDate to) {
        List<Event> events;
        if (from != null && to != null) {
            events = eventRepository.findAllByStartDateBetweenOrderByStartDateDesc(from, to);
        } else if (from != null) {
            events = eventRepository.findAllByStartDateGreaterThanEqualOrderByStartDateDesc(from);
        } else if (to != null) {
            events = eventRepository.findAllByStartDateLessThanEqualOrderByStartDateDesc(to);
        } else {
            events = eventRepository.findAllByOrderByStartDateDesc();
        }
        return events.stream().map(eventMapper::toEventListResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventListResponse> getEventsByCategory(String category) {
        return eventRepository.findAllByCategory(category)
                .stream().map(eventMapper::toEventListResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventListResponse> getEventsByStatus(EventStatus status) {
        return eventRepository.findAllByStatus(status)
                .stream().map(eventMapper::toEventListResponse).toList();
    }

    // =========================================================================
    // Admin: toggles
    // =========================================================================

    @Override
    @Transactional
    public EventResponse toggleFeatured(String eventUuid) {
        Event event   = findEventByUuid(eventUuid);
        event.setFeatured(!event.getFeatured());
        Event updated = eventRepository.save(event);
        log.info("Featured toggled: uuid={}, featured={}", eventUuid, updated.getFeatured());
        return toDetailResponse(updated);
    }

    @Override
    @Transactional
    public EventResponse togglePublished(String eventUuid) {
        Event event   = findEventByUuid(eventUuid);
        event.setPublished(!event.getPublished());
        Event updated = eventRepository.save(event);
        log.info("Published toggled: uuid={}, published={}", eventUuid, updated.getPublished());
        return toDetailResponse(updated);
    }

    // =========================================================================
    // Admin: cover photo
    // =========================================================================

    @Override
    @Transactional
    public String uploadCover(String eventUuid, MultipartFile file) {
        Event event    = findEventByUuid(eventUuid);
        User  uploader = getAuthenticatedUser();

        if (event.getCoverStoredFileName() != null) {
            imageProcessingService.delete(event.getCoverStoredFileName(), null);
        }

        ImageProcessingService.ProcessedImage processed;
        try {
            processed = imageProcessingService.process(file);
        } catch (IOException e) {
            throw new RuntimeException("Cover photo processing failed: " + e.getMessage(), e);
        }

        event.setCoverImageUrl(processed.imageUrl());
        event.setCoverStoredFileName(processed.storedFileName());
        eventRepository.save(event);

        log.info("Cover uploaded: eventUuid={}, uploadedBy={}", eventUuid, uploader.getEmail());
        return processed.imageUrl();
    }

    @Override
    @Transactional
    public void deleteCover(String eventUuid) {
        Event event = findEventByUuid(eventUuid);
        if (event.getCoverStoredFileName() != null) {
            imageProcessingService.delete(event.getCoverStoredFileName(), null);
            event.setCoverImageUrl(null);
            event.setCoverStoredFileName(null);
            eventRepository.save(event);
            log.info("Cover deleted: eventUuid={}", eventUuid);
        }
    }

    // =========================================================================
    // Admin: gallery media  (delegates to EventMediaService)
    // =========================================================================

    @Override
    @Transactional(readOnly = true)
    public List<EventMediaResponse> getMedia(String eventUuid) {
        return eventMediaService.getMedia(eventUuid);
    }

    @Override
    @Transactional
    public List<EventMediaResponse> uploadMedia(String eventUuid, List<MultipartFile> files) {
        return eventMediaService.uploadMedia(eventUuid, files);
    }

    @Override
    @Transactional
    public EventMediaResponse updateMedia(String eventUuid, String mediaUuid, UpdateMediaRequest request) {
        return eventMediaService.updateMedia(eventUuid, mediaUuid, request);
    }

    @Override
    @Transactional
    public List<EventMediaResponse> reorderMedia(String eventUuid, ReorderMediaRequest request) {
        return eventMediaService.reorderMedia(eventUuid, request);
    }

    @Override
    @Transactional
    public void deleteMedia(String eventUuid, String mediaUuid) {
        eventMediaService.deleteMedia(eventUuid, mediaUuid);
    }

    @Override
    @Transactional
    public EventMediaResponse toggleMedia(String eventUuid, String mediaUuid) {
        return eventMediaService.toggleMedia(eventUuid, mediaUuid);
    }

    // =========================================================================
    // Public: listings
    // =========================================================================

    @Override
    @Transactional(readOnly = true)
    public List<EventListResponse> getPublishedEventsSorted() {
        // Three-bucket merge: each bucket has its own sort direction
        List<Event> result = new ArrayList<>();
        result.addAll(eventRepository.findAllByPublishedTrueAndStatusOrderByStartDateAsc(EventStatus.UPCOMING));
        result.addAll(eventRepository.findAllByPublishedTrueAndStatusOrderByStartDateAsc(EventStatus.ONGOING));
        result.addAll(eventRepository.findAllByPublishedTrueAndStatusOrderByStartDateDesc(EventStatus.COMPLETED));
        return result.stream().map(eventMapper::toEventListResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventListResponse> getFeaturedEvents() {
        return eventRepository.findFeaturedPublishedEvents()
                .stream().map(eventMapper::toEventListResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventListResponse> getPublishedUpcomingEvents() {
        return eventRepository
                .findAllByPublishedTrueAndStatusOrderByStartDateAsc(EventStatus.UPCOMING)
                .stream().map(eventMapper::toEventListResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventListResponse> getPublishedOngoingEvents() {
        return eventRepository
                .findAllByPublishedTrueAndStatusOrderByStartDateAsc(EventStatus.ONGOING)
                .stream().map(eventMapper::toEventListResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventListResponse> getPublishedCompletedEvents() {
        return eventRepository
                .findAllByPublishedTrueAndStatusOrderByStartDateDesc(EventStatus.COMPLETED)
                .stream().map(eventMapper::toEventListResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventListResponse> getPublishedEventsByCategory(String category) {
        // Same three-bucket sort, scoped to one category
        List<Event> result = new ArrayList<>();
        result.addAll(eventRepository.findAllByPublishedTrueAndCategoryAndStatusOrderByStartDateAsc(
                category, EventStatus.UPCOMING));
        result.addAll(eventRepository.findAllByPublishedTrueAndCategoryAndStatusOrderByStartDateAsc(
                category, EventStatus.ONGOING));
        result.addAll(eventRepository.findAllByPublishedTrueAndCategoryAndStatusOrderByStartDateDesc(
                category, EventStatus.COMPLETED));
        return result.stream().map(eventMapper::toEventListResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> getPublishedCategories() {
        return eventRepository.findDistinctPublishedCategories();
    }

    @Override
    @Transactional(readOnly = true)
    public EventResponse getPublishedEventBySlug(String slug) {
        Event event = eventRepository.findBySlugAndPublishedTrue(slug)
                .orElseThrow(() -> new EventNotFoundException("slug", slug));

        // Public detail page needs the actual gallery, not just a count.
        List<EventMediaResponse> media = eventMediaService.getMedia(event.getUuid());
        return eventMapper.toEventResponse(event, media.size(), media);
    }

    // =========================================================================
    // Private helpers
    // =========================================================================

    private User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            throw new IllegalStateException("No authenticated user found in security context");
        }
        Object principal = auth.getPrincipal();
        if (!(principal instanceof String userUuid)) {
            throw new IllegalStateException(
                    "Invalid principal type: " + principal.getClass().getName());
        }
        return userRepository.findByUuid(userUuid)
                .orElseThrow(() -> new IllegalStateException(
                        "Authenticated user not found for UUID: " + userUuid));
    }

    private Event findEventByUuid(String uuid) {
        return eventRepository.findByUuid(uuid)
                .orElseThrow(() -> new EventNotFoundException("uuid", uuid));
    }

    private EventStatus calculateStatus(LocalDate startDate, LocalDate endDate) {
        LocalDate today = LocalDate.now();
        if (today.isBefore(startDate)) return EventStatus.UPCOMING;
        if (endDate != null) {
            return today.isAfter(endDate) ? EventStatus.COMPLETED : EventStatus.ONGOING;
        }
        return today.isEqual(startDate) ? EventStatus.ONGOING : EventStatus.COMPLETED;
    }

    private void validateDateRange(LocalDate startDate, LocalDate endDate) {
        if (startDate != null && endDate != null && !endDate.isAfter(startDate)) {
            throw new IllegalArgumentException("End date must be after start date");
        }
    }

    private String generateUniqueSlug(String title) {
        String base = toSlug(title);
        if (!eventRepository.existsBySlug(base)) return base;
        int counter = 1;
        String candidate;
        do { candidate = base + "-" + counter++; }
        while (eventRepository.existsBySlug(candidate));
        return candidate;
    }

    private String generateUniqueSlugExcluding(String title, String currentSlug) {
        String base = toSlug(title);
        if (base.equals(currentSlug) || !eventRepository.existsBySlug(base)) return base;
        int counter = 1;
        String candidate;
        do { candidate = base + "-" + counter++; }
        while (eventRepository.existsBySlug(candidate) && !candidate.equals(currentSlug));
        return candidate;
    }

    private String toSlug(String title) {
        return title.trim()
                .toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("[\\s]+", "-")
                .replaceAll("-{2,}", "-")
                .replaceAll("^-|-$", "");
    }

    /**
     * Builds the admin-facing detail response.
     * Media here is just a count — the admin UI fetches the actual gallery
     * separately via {@code GET /{uuid}/media} when the Photos panel opens.
     */
    private EventResponse toDetailResponse(Event event) {
        int mediaCount = (int) eventMediaRepository.countByEventAndActiveTrue(event);
        return eventMapper.toEventResponse(event, mediaCount, Collections.emptyList());
    }

    @Override
    @Transactional
    public void recalculateEventStatuses() {
        List<Event> events = eventRepository
                .findAllByStatusNotAndStatusOverriddenFalse(EventStatus.CANCELLED);

        int updated = 0;
        for (Event event : events) {
            EventStatus newStatus = calculateStatus(event.getStartDate(), event.getEndDate());
            if (newStatus != event.getStatus()) {
                event.setStatus(newStatus);
                eventRepository.save(event);
                updated++;
            }
        }
        log.info("Event status recalculation complete: {} of {} events updated", updated, events.size());
    }

    @Override
    @Transactional
    public EventResponse setEventStatus(String eventUuid, EventStatus status) {
        Event event = findEventByUuid(eventUuid);
        event.setStatus(status);
        event.setStatusOverridden(true);   // pin it — scheduler will leave it alone
        Event updated = eventRepository.save(event);
        log.info("Status manually set: uuid={}, status={}", eventUuid, status);
        return toDetailResponse(updated);
    }

    @Override
    @Transactional
    public EventResponse resetEventStatusToAutomatic(String eventUuid) {
        Event event = findEventByUuid(eventUuid);
        event.setStatusOverridden(false);
        event.setStatus(calculateStatus(event.getStartDate(), event.getEndDate()));
        Event updated = eventRepository.save(event);
        log.info("Status reset to automatic: uuid={}, status={}", eventUuid, updated.getStatus());
        return toDetailResponse(updated);
    }
}