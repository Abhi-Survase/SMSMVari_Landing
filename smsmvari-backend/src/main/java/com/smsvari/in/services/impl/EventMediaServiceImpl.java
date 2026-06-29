package com.smsvari.in.services.impl;

import com.smsvari.in.dto.request.ReorderMediaRequest;
import com.smsvari.in.dto.request.UpdateMediaRequest;
import com.smsvari.in.dto.response.EventMediaResponse;
import com.smsvari.in.entity.Event;
import com.smsvari.in.entity.EventMedia;
import com.smsvari.in.entity.User;
import com.smsvari.in.exception.EventNotFoundException;
import com.smsvari.in.exception.MediaNotFoundException;
import com.smsvari.in.mapper.EventMediaMapper;
import com.smsvari.in.repository.EventMediaRepository;
import com.smsvari.in.repository.EventRepository;
import com.smsvari.in.repository.UserRepository;
import com.smsvari.in.services.EventMediaService;
import com.smsvari.in.services.ImageProcessingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Production implementation of {@link EventMediaService}.
 *
 * <p>Design decisions:</p>
 * <ul>
 *   <li>Images are converted to WebP (main + thumbnail) via {@link ImageProcessingService}
 *       — the same pipeline used by the gallery module.</li>
 *   <li>Cover photo is stored under {@code covers/<eventUuid>.webp}.  Re-uploading a
 *       cover deletes the old file before writing the new one.</li>
 *   <li>Every {@link EventMedia} row records which admin uploaded the file
 *       ({@code uploadedBy}), resolved from the JWT in the Spring Security context.</li>
 *   <li>Batch uploads are transactional; if processing fails mid-batch, already-written
 *       files are cleaned up in a best-effort finally block so no orphaned files remain.</li>
 *   <li>{@link #deleteMedia} is a hard delete: file + thumbnail removed from disk and the
 *       DB row is dropped.  Use {@link #toggleMedia} for temporary hiding.</li>
 * </ul>
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EventMediaServiceImpl implements EventMediaService {

    private final EventRepository        eventRepository;
    private final EventMediaRepository   eventMediaRepository;
    private final UserRepository         userRepository;
    private final ImageProcessingService imageProcessingService;
    private final EventMediaMapper       eventMediaMapper;

    // =========================================================================
    // Cover photo
    // =========================================================================

    @Override
    @Transactional
    public String uploadCover(String eventUuid, MultipartFile file) {
        Event event   = findEvent(eventUuid);
        User  uploader = getAuthenticatedUser();

        // Delete old cover file from disk before overwriting
        if (event.getCoverImageUrl() != null && event.getCoverStoredFileName() != null) {
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

        log.info("Cover uploaded: eventUuid={}, url={}, uploadedBy={}",
                eventUuid, processed.imageUrl(), uploader.getEmail());
        return processed.imageUrl();
    }

    @Override
    @Transactional
    public void deleteCover(String eventUuid) {
        Event event = findEvent(eventUuid);
        if (event.getCoverImageUrl() != null) {
            if (event.getCoverStoredFileName() != null) {
                imageProcessingService.delete(event.getCoverStoredFileName(), null);
            }
            event.setCoverImageUrl(null);
            event.setCoverStoredFileName(null);
            eventRepository.save(event);
            log.info("Cover deleted: eventUuid={}", eventUuid);
        }
    }

    // =========================================================================
    // Media gallery — read
    // =========================================================================

    @Override
    @Transactional(readOnly = true)
    public List<EventMediaResponse> getMedia(String eventUuid) {
        Event event = findEvent(eventUuid);
        return eventMediaRepository
                .findAllByEventAndActiveTrueOrderByDisplayOrderAscCreatedAtAsc(event)
                .stream()
                .map(eventMediaMapper::toResponse)
                .toList();
    }

    // =========================================================================
    // Media gallery — upload (batch)
    // =========================================================================

    @Override
    @Transactional
    public List<EventMediaResponse> uploadMedia(String eventUuid, List<MultipartFile> files) {
        if (files == null || files.isEmpty()) {
            throw new IllegalArgumentException("At least one file is required");
        }
        if (files.size() > 20) {
            throw new IllegalArgumentException("Maximum 20 files per upload batch");
        }

        Event event    = findEvent(eventUuid);
        User  uploader = getAuthenticatedUser();

        // Next display order = current max + 1
        int nextOrder = eventMediaRepository.findMaxDisplayOrderByEvent(event)
                .map(max -> max + 1)
                .orElse(0);

        List<EventMedia>                          saved      = new ArrayList<>();
        List<ImageProcessingService.ProcessedImage> processed = new ArrayList<>();

        try {
            for (MultipartFile file : files) {

                ImageProcessingService.ProcessedImage result;
                try {
                    result = imageProcessingService.process(file);
                } catch (IOException e) {
                    throw new RuntimeException(
                            "Image processing failed for '" + file.getOriginalFilename()
                                    + "': " + e.getMessage(), e);
                }
                processed.add(result);

                EventMedia media = EventMedia.builder()
                        .event(event)
                        .fileUrl(result.imageUrl())
                        .thumbnailUrl(result.thumbnailUrl())
                        .storedFileName(result.storedFileName())
                        .thumbnailFileName(extractFileName(result.thumbnailUrl()))
                        .originalFileName(file.getOriginalFilename())
                        .mimeType("image/webp")
                        .fileSize(result.fileSize())
                        .width(result.width())
                        .height(result.height())
                        .displayOrder(nextOrder++)
                        .active(true)
                        .uploadedBy(uploader)
                        .build();

                saved.add(eventMediaRepository.save(media));
            }

        } catch (RuntimeException ex) {
            // Best-effort rollback: delete any files already written to disk
            processed.forEach(p ->
                    imageProcessingService.delete(
                            p.storedFileName(),
                            extractFileName(p.thumbnailUrl())
                    )
            );
            throw ex;
        }

        log.info("Uploaded {} media file(s) for event {} by {}",
                saved.size(), eventUuid, uploader.getEmail());
        return saved.stream().map(eventMediaMapper::toResponse).toList();
    }

    // =========================================================================
    // Media gallery — update caption / order
    // =========================================================================

    @Override
    @Transactional
    public EventMediaResponse updateMedia(String eventUuid, String mediaUuid,
                                          UpdateMediaRequest request) {
        EventMedia media = findMedia(eventUuid, mediaUuid);
        if (request.getCaption()      != null) media.setCaption(request.getCaption());
        if (request.getDisplayOrder() != null) media.setDisplayOrder(request.getDisplayOrder());
        return eventMediaMapper.toResponse(eventMediaRepository.save(media));
    }

    // =========================================================================
    // Media gallery — reorder
    // =========================================================================

    @Override
    @Transactional
    public List<EventMediaResponse> reorderMedia(String eventUuid, ReorderMediaRequest request) {
        Event event = findEvent(eventUuid);

        List<EventMedia> allMedia = eventMediaRepository
                .findAllByEventOrderByDisplayOrderAsc(event);

        Map<String, EventMedia> byUuid = allMedia.stream()
                .collect(Collectors.toMap(EventMedia::getUuid, Function.identity()));

        List<String> orderedUuids = request.getOrderedUuids();
        if (orderedUuids.size() != allMedia.size()) {
            throw new IllegalArgumentException(
                    "orderedUuids must contain exactly " + allMedia.size() + " UUIDs");
        }

        for (int i = 0; i < orderedUuids.size(); i++) {
            EventMedia m = byUuid.get(orderedUuids.get(i));
            if (m == null) {
                throw new IllegalArgumentException(
                        "Unknown media UUID in reorder list: " + orderedUuids.get(i));
            }
            m.setDisplayOrder(i);
        }

        eventMediaRepository.saveAll(byUuid.values());

        return eventMediaRepository
                .findAllByEventOrderByDisplayOrderAsc(event)
                .stream()
                .map(eventMediaMapper::toResponse)
                .toList();
    }

    // =========================================================================
    // Media gallery — delete
    // =========================================================================

    @Override
    @Transactional
    public void deleteMedia(String eventUuid, String mediaUuid) {
        EventMedia media = findMedia(eventUuid, mediaUuid);

        // Remove WebP file and its thumbnail from disk
        imageProcessingService.delete(
                media.getStoredFileName(),
                media.getThumbnailFileName()
        );

        eventMediaRepository.delete(media);
        log.info("Media deleted: eventUuid={}, mediaUuid={}", eventUuid, mediaUuid);
    }

    // =========================================================================
    // Media gallery — toggle active
    // =========================================================================

    @Override
    @Transactional
    public EventMediaResponse toggleMedia(String eventUuid, String mediaUuid) {
        EventMedia media = findMedia(eventUuid, mediaUuid);
        media.setActive(!media.getActive());
        return eventMediaMapper.toResponse(eventMediaRepository.save(media));
    }

    // =========================================================================
    // Private helpers
    // =========================================================================

    /**
     * Resolves the currently authenticated {@link User} from the Spring Security context.
     * The JWT filter stores the user's UUID as the principal string.
     */
    private User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new IllegalStateException("No authenticated user found in security context");
        }

        Object principal = auth.getPrincipal();
        if (!(principal instanceof String userUuid)) {
            throw new IllegalStateException("Invalid authentication principal type: "
                    + principal.getClass().getName());
        }

        return userRepository.findByUuid(userUuid)
                .orElseThrow(() -> new IllegalStateException(
                        "Authenticated user not found for UUID: " + userUuid));
    }

    private Event findEvent(String uuid) {
        return eventRepository.findByUuid(uuid)
                .orElseThrow(() -> new EventNotFoundException("uuid", uuid));
    }

    private EventMedia findMedia(String eventUuid, String mediaUuid) {
        Event event = findEvent(eventUuid);
        return eventMediaRepository.findByUuidAndEvent(mediaUuid, event)
                .orElseThrow(() -> new MediaNotFoundException(mediaUuid));
    }

    /**
     * Extracts the bare filename from a URL path.
     * e.g. {@code "http://localhost:8080/gallery/thumbnails/abc_thumb.webp"} → {@code "abc_thumb.webp"}
     */
    private String extractFileName(String url) {
        if (url == null) return null;
        return url.substring(url.lastIndexOf('/') + 1);
    }
}