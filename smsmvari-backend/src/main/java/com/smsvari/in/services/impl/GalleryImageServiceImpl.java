package com.smsvari.in.services.impl;

import com.smsvari.in.dto.GalleryImageDto;
import com.smsvari.in.dto.response.PagedResponse;
import com.smsvari.in.dto.request.ReorderImagesRequest;
import com.smsvari.in.dto.request.UpdateImageRequest;
import com.smsvari.in.entity.GalleryCategory;
import com.smsvari.in.entity.GalleryImage;
import com.smsvari.in.entity.User;
import com.smsvari.in.mapper.GalleryMapper;
import com.smsvari.in.repository.GalleryImageRepository;
import com.smsvari.in.repository.UserRepository;
import com.smsvari.in.services.GalleryCategoryService;
import com.smsvari.in.services.GalleryImageService;
import com.smsvari.in.services.ImageProcessingService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GalleryImageServiceImpl implements GalleryImageService {

    private final GalleryImageRepository imageRepository;
    private final UserRepository         userRepository;
    private final GalleryCategoryService categoryService;
    private final ImageProcessingService processingService;
    private final GalleryMapper          mapper;

    // ── Admin: Upload ────────────────────────────────────────────────────────

    /**
     * Upload a single image. Converts any supported format → WebP.
     *
     * @param file          raw upload
     * @param categoryUuid  optional category (null = uncategorised)
     * @param featured      mark as featured
     * @param displayOrder  ordering hint (0 if not supplied)
     * @param adminUserUuid uploader's UUID
     */
    @Override
    public GalleryImageDto upload(MultipartFile file,
                                  String categoryUuid,
                                  Boolean featured,
                                  Integer displayOrder,
                                  String adminUserUuid) throws IOException {

        User uploader = userRepository.findByUuid(adminUserUuid)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + adminUserUuid));

        GalleryCategory category = null;
        if (categoryUuid != null && !categoryUuid.isBlank()) {
            category = categoryService.findByUuidOrThrow(categoryUuid);
        }

        // Process: validate + resize + convert to WebP
        ImageProcessingService.ProcessedImage processed = processingService.process(file);

        GalleryImage image = GalleryImage.builder()
                .originalFileName(file.getOriginalFilename())
                .storedFileName(processed.storedFileName())
                .imageUrl(processed.imageUrl())
                .thumbnailUrl(processed.thumbnailUrl())
                .fileSize(processed.fileSize())
                .width(processed.width())
                .height(processed.height())
                .mimeType("image/webp")           // always stored as WebP
                .featured(featured != null && featured)
                .active(true)
                .displayOrder(displayOrder != null ? displayOrder : 0)
                .category(category)
                .createdBy(uploader)
                .build();

        GalleryImage saved = imageRepository.save(image);
        log.info("Uploaded image {} to category {} by user {}",
                saved.getUuid(), categoryUuid, adminUserUuid);

        return mapper.toImageDto(saved);
    }

    /**
     * Bulk upload — calls upload() for each file. Returns list of created DTOs.
     */
    @Override
    public List<GalleryImageDto> uploadBulk(List<MultipartFile> files,
                                            String categoryUuid,
                                            String adminUserUuid) throws IOException {
        List<GalleryImageDto> results = new java.util.ArrayList<>();
        for (MultipartFile file : files) {
            results.add(upload(file, categoryUuid, false, 0, adminUserUuid));
        }
        return results;
    }

    // ── Admin: Update ────────────────────────────────────────────────────────

    @Override
    public GalleryImageDto update(String uuid, UpdateImageRequest req) {
        GalleryImage image = findByUuidOrThrow(uuid);

        // categoryUuid == null → keep current; empty string → remove category
        if (req.getCategoryUuid() != null) {
            if (req.getCategoryUuid().isBlank()) {
                image.setCategory(null);
            } else {
                GalleryCategory cat = categoryService.findByUuidOrThrow(req.getCategoryUuid());
                image.setCategory(cat);
            }
        }

        if (req.getFeatured() != null)      image.setFeatured(req.getFeatured());
        if (req.getActive() != null)        image.setActive(req.getActive());
        if (req.getDisplayOrder() != null)  image.setDisplayOrder(req.getDisplayOrder());

        return mapper.toImageDto(imageRepository.save(image));
    }

    // ── Admin: Reorder ───────────────────────────────────────────────────────

    @Override
    public void reorder(ReorderImagesRequest req) {
        for (ReorderImagesRequest.ImageOrderItem item : req.getItems()) {
            imageRepository.updateDisplayOrder(item.getUuid(), item.getDisplayOrder());
        }
    }

    // ── Admin: Delete ────────────────────────────────────────────────────────

    @Override
    public void delete(String uuid) {
        GalleryImage image = findByUuidOrThrow(uuid);
        processingService.delete(image.getStoredFileName(), image.getThumbnailUrl() != null
                ? extractFileName(image.getThumbnailUrl()) : null);
        imageRepository.delete(image);
        log.info("Deleted gallery image '{}'", uuid);
    }

    // ── Admin: Fetch ─────────────────────────────────────────────────────────

    /** All images (paginated). */
    @Override
    @Transactional(readOnly = true)
    public PagedResponse<GalleryImageDto> listAll(Pageable pageable) {
        Page<GalleryImage> page = imageRepository.findAll(pageable);
        return PagedResponse.of(page.map(mapper::toImageDto));
    }

    /** All images for a specific category (admin — includes inactive). */
    @Override
    @Transactional(readOnly = true)
    public PagedResponse<GalleryImageDto> listByCategory(String categoryUuid, Pageable pageable) {
        GalleryCategory category = categoryService.findByUuidOrThrow(categoryUuid);
        Page<GalleryImage> page  = imageRepository.findByCategory(category, pageable);
        return PagedResponse.of(page.map(mapper::toImageDto));
    }

    /** Images without any category. */
    @Override
    @Transactional(readOnly = true)
    public PagedResponse<GalleryImageDto> listUncategorised(Pageable pageable) {
        return PagedResponse.of(imageRepository.findByCategoryIsNull(pageable)
                .map(mapper::toImageDto));
    }

    /** Get single image (admin). */
    @Override
    @Transactional(readOnly = true)
    public GalleryImageDto getByUuid(String uuid) {
        return mapper.toImageDto(findByUuidOrThrow(uuid));
    }

    // ── Public: Fetch ────────────────────────────────────────────────────────

    /** Public: paginated active images (all categories). */
    @Override
    @Transactional(readOnly = true)
    public PagedResponse<GalleryImageDto> listActiveAll(Pageable pageable) {
        return PagedResponse.of(imageRepository.findAllByActiveTrue(pageable)
                .map(mapper::toImageDto));
    }

    /** Public: active images for a specific active category. */
    @Override
    @Transactional(readOnly = true)
    public PagedResponse<GalleryImageDto> listActiveByCategoryUuid(String categoryUuid,
                                                                   Pageable pageable) {
        GalleryCategory category = categoryService.findByUuidOrThrow(categoryUuid);
        if (!category.getActive()) {
            throw new EntityNotFoundException("Category not found: " + categoryUuid);
        }
        Page<GalleryImage> page = imageRepository.findByCategoryAndActiveTrue(category, pageable);
        return PagedResponse.of(page.map(mapper::toImageDto));
    }

    /** Public: featured images (ordered by displayOrder). */
    @Override
    @Transactional(readOnly = true)
    public List<GalleryImageDto> listFeatured() {
        return imageRepository.findAllByFeaturedTrueAndActiveTrueOrderByDisplayOrderAsc()
                .stream().map(mapper::toImageDto).collect(Collectors.toList());
    }

    /** Public: single active image. */
    @Override
    @Transactional(readOnly = true)
    public GalleryImageDto getActiveByUuid(String uuid) {
        GalleryImage image = findByUuidOrThrow(uuid);
        if (!image.getActive()) {
            throw new EntityNotFoundException("Image not found: " + uuid);
        }
        return mapper.toImageDto(image);
    }

    // ── Helpers ──────────────────────────────────────────────────────────────
    private GalleryImage findByUuidOrThrow(String uuid) {
        return imageRepository.findByUuid(uuid)
                .orElseThrow(() -> new EntityNotFoundException("Image not found: " + uuid));
    }

    /** Extract just the filename from a stored URL. */
    private String extractFileName(String url) {
        if (url == null) return null;
        return url.substring(url.lastIndexOf('/') + 1);
    }
}