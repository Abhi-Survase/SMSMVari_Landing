package com.smsvari.in.services;

import com.smsvari.in.dto.GalleryImageDto;
import com.smsvari.in.dto.response.PagedResponse;
import com.smsvari.in.dto.request.ReorderImagesRequest;
import com.smsvari.in.dto.request.UpdateImageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface GalleryImageService {

    // Admin - Upload

    GalleryImageDto upload(
            MultipartFile file,
            String categoryUuid,
            Boolean featured,
            Integer displayOrder,
            String adminUserUuid
    ) throws IOException;

    List<GalleryImageDto> uploadBulk(
            List<MultipartFile> files,
            String categoryUuid,
            String adminUserUuid
    ) throws IOException;

    // Admin - Update

    GalleryImageDto update(
            String uuid,
            UpdateImageRequest request
    );

    // Admin - Reorder

    void reorder(
            ReorderImagesRequest request
    );

    // Admin - Delete

    void delete(
            String uuid
    );

    // Admin - Fetch

    PagedResponse<GalleryImageDto> listAll(
            Pageable pageable
    );

    PagedResponse<GalleryImageDto> listByCategory(
            String categoryUuid,
            Pageable pageable
    );

    PagedResponse<GalleryImageDto> listUncategorised(
            Pageable pageable
    );

    GalleryImageDto getByUuid(
            String uuid
    );

    // Public - Fetch

    PagedResponse<GalleryImageDto> listActiveAll(
            Pageable pageable
    );

    PagedResponse<GalleryImageDto> listActiveByCategoryUuid(
            String categoryUuid,
            Pageable pageable
    );

    List<GalleryImageDto> listFeatured();

    GalleryImageDto getActiveByUuid(
            String uuid
    );
}