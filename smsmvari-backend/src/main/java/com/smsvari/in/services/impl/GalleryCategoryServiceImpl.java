package com.smsvari.in.services.impl;

import com.smsvari.in.dto.GalleryCategoryDto;
import com.smsvari.in.dto.response.PagedResponse;
import com.smsvari.in.dto.request.CreateCategoryRequest;
import com.smsvari.in.dto.request.UpdateCategoryRequest;
import com.smsvari.in.entity.GalleryCategory;
import com.smsvari.in.entity.User;
import com.smsvari.in.mapper.GalleryMapper;
import com.smsvari.in.repository.GalleryCategoryRepository;
import com.smsvari.in.repository.GalleryImageRepository;
import com.smsvari.in.repository.UserRepository;
import com.smsvari.in.services.GalleryCategoryService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GalleryCategoryServiceImpl implements GalleryCategoryService {

    private final GalleryCategoryRepository categoryRepository;
    private final GalleryImageRepository    imageRepository;
    private final UserRepository            userRepository;
    private final GalleryMapper             mapper;

    // ── Admin operations ─────────────────────────────────────────────────────

    @Override
    public GalleryCategoryDto create(CreateCategoryRequest req, String adminUserUuid) {
        if (categoryRepository.existsByName(req.getName())) {
            throw new IllegalArgumentException("Category with name '" + req.getName() + "' already exists.");
        }

        User admin = userRepository.findByUuid(adminUserUuid)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + adminUserUuid));

        GalleryCategory category = GalleryCategory.builder()
                .name(req.getName().trim())
                .description(req.getDescription())
                .active(true)
                .createdBy(admin)
                .build();

        GalleryCategory saved = categoryRepository.save(category);
        log.info("Created gallery category '{}' by user {}", saved.getName(), adminUserUuid);
        return mapper.toCategoryDto(saved, false, 0);
    }

    @Override
    public GalleryCategoryDto update(String uuid, UpdateCategoryRequest req) {
        GalleryCategory category = findByUuidOrThrow(uuid);

        if (req.getName() != null && !req.getName().isBlank()) {
            String trimmed = req.getName().trim();
            if (categoryRepository.existsByNameAndUuidNot(trimmed, uuid)) {
                throw new IllegalArgumentException("Another category already uses the name '" + trimmed + "'.");
            }
            category.setName(trimmed);
        }

        if (req.getDescription() != null) {
            category.setDescription(req.getDescription());
        }

        if (req.getActive() != null) {
            category.setActive(req.getActive());
        }

        GalleryCategory saved = categoryRepository.save(category);
        long count = imageRepository.countByCategory(saved);
        return mapper.toCategoryDto(saved, false, count);
    }

    @Override
    public void delete(String uuid) {
        GalleryCategory category = findByUuidOrThrow(uuid);
        long imageCount = imageRepository.countByCategory(category);
        if (imageCount > 0) {
            throw new IllegalStateException(
                    "Cannot delete category '" + category.getName() + "' — it still contains " +
                            imageCount + " image(s). Remove or reassign them first.");
        }
        categoryRepository.delete(category);
        log.info("Deleted gallery category '{}'", uuid);
    }

    /** Admin: paginated list of ALL categories (active + inactive). */
    @Transactional(readOnly = true)
    public PagedResponse<GalleryCategoryDto> listAll(Pageable pageable) {
        Page<GalleryCategory> page = categoryRepository.findAll(pageable);
        Page<GalleryCategoryDto> dtoPage = page.map(c -> {
            long cnt = imageRepository.countByCategory(c);
            return mapper.toCategoryDto(c, false, cnt);
        });
        return PagedResponse.of(dtoPage);
    }

    /** Admin: get single category with full image list. */
    @Transactional(readOnly = true)
    public GalleryCategoryDto getByUuid(String uuid) {
        GalleryCategory category = findByUuidOrThrow(uuid);
        long count = imageRepository.countByCategory(category);
        return mapper.toCategoryDto(category, true, count);
    }

    // ── Public operations ────────────────────────────────────────────────────

    /** Public: paginated list of ACTIVE categories only. */
    @Transactional(readOnly = true)
    public PagedResponse<GalleryCategoryDto> listActive(Pageable pageable) {
        Page<GalleryCategory> page = categoryRepository.findAllByActiveTrue(pageable);
        Page<GalleryCategoryDto> dtoPage = page.map(c -> {
            long cnt = imageRepository.countByCategoryAndActiveTrue(c);
            return mapper.toCategoryDto(c, false, cnt);
        });
        return PagedResponse.of(dtoPage);
    }

    /** Public: all active categories as a flat list (for dropdowns / nav). */
    @Transactional(readOnly = true)
    public List<GalleryCategoryDto> listActiveFlat() {
        return categoryRepository.findAllByActiveTrueOrderByNameAsc()
                .stream()
                .map(c -> mapper.toCategoryDto(c, false,
                        imageRepository.countByCategoryAndActiveTrue(c)))
                .collect(Collectors.toList());
    }

    /** Public: get active category with its active images. */
    @Transactional(readOnly = true)
    public GalleryCategoryDto getActiveByUuid(String uuid) {
        GalleryCategory category = findByUuidOrThrow(uuid);
        if (!category.getActive()) {
            throw new EntityNotFoundException("Category not found: " + uuid);
        }
        long count = imageRepository.countByCategoryAndActiveTrue(category);
        return mapper.toCategoryDto(category, true, count);
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    public GalleryCategory findByUuidOrThrow(String uuid) {
        return categoryRepository.findByUuid(uuid)
                .orElseThrow(() -> new EntityNotFoundException("Category not found: " + uuid));
    }
}