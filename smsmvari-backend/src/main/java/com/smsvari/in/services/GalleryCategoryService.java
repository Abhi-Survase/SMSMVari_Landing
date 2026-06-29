package com.smsvari.in.services;

import com.smsvari.in.dto.GalleryCategoryDto;
import com.smsvari.in.dto.response.PagedResponse;
import com.smsvari.in.dto.request.CreateCategoryRequest;
import com.smsvari.in.dto.request.UpdateCategoryRequest;
import com.smsvari.in.entity.GalleryCategory;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GalleryCategoryService {

    // Admin Operations
    GalleryCategoryDto create(CreateCategoryRequest request, String adminUserUuid);

    GalleryCategoryDto update(String uuid, UpdateCategoryRequest request);

    void delete(String uuid);

    PagedResponse<GalleryCategoryDto> listAll(Pageable pageable);

    GalleryCategoryDto getByUuid(String uuid);

    // Public Operations
    PagedResponse<GalleryCategoryDto> listActive(Pageable pageable);

    List<GalleryCategoryDto> listActiveFlat();

    GalleryCategoryDto getActiveByUuid(String uuid);

    // Internal Helper
    GalleryCategory findByUuidOrThrow(String uuid);
}