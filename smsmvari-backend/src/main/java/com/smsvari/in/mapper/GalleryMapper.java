package com.smsvari.in.mapper;

import com.smsvari.in.dto.GalleryCategoryDto;
import com.smsvari.in.dto.GalleryImageDto;
import com.smsvari.in.entity.GalleryCategory;
import com.smsvari.in.entity.GalleryImage;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class GalleryMapper {

    // ── Image ────────────────────────────────────────────────────────────────

    public GalleryImageDto toImageDto(GalleryImage image) {
        if (image == null) return null;

        GalleryImageDto dto = GalleryImageDto.builder()
                .uuid(image.getUuid())
                .originalFileName(image.getOriginalFileName())
                .storedFileName(image.getStoredFileName())
                .imageUrl(image.getImageUrl())
                .thumbnailUrl(image.getThumbnailUrl())
                .fileSize(image.getFileSize())
                .width(image.getWidth())
                .height(image.getHeight())
                .mimeType(image.getMimeType())
                .featured(image.getFeatured())
                .active(image.getActive())
                .displayOrder(image.getDisplayOrder())
                .createdAt(image.getCreatedAt())
                .updatedAt(image.getUpdatedAt())
                .build();

        if (image.getCategory() != null) {
            dto.setCategoryUuid(image.getCategory().getUuid());
            dto.setCategoryName(image.getCategory().getName());
        }

        if (image.getCreatedBy() != null) {
            dto.setCreatedByUuid(image.getCreatedBy().getUuid());
            dto.setCreatedByName(image.getCreatedBy().getFullName());
        }

        return dto;
    }

    public List<GalleryImageDto> toImageDtoList(List<GalleryImage> images) {
        return images.stream().map(this::toImageDto).collect(Collectors.toList());
    }

    // ── Category ─────────────────────────────────────────────────────────────

    /**
     * Category without embedded images list (for lightweight listing).
     */
    public GalleryCategoryDto toCategoryDto(GalleryCategory category) {
        return toCategoryDto(category, false, 0);
    }

    /**
     * Category with optional image count and embedded image list.
     */
    public GalleryCategoryDto toCategoryDto(GalleryCategory category,
                                            boolean includeImages,
                                            long imageCount) {
        if (category == null) return null;

        GalleryCategoryDto dto = GalleryCategoryDto.builder()
                .uuid(category.getUuid())
                .name(category.getName())
                .description(category.getDescription())
                .active(category.getActive())
                .imageCount((int) imageCount)
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();

        if (category.getCreatedBy() != null) {
            dto.setCreatedByUuid(category.getCreatedBy().getUuid());
            dto.setCreatedByName(category.getCreatedBy().getFullName());
        }

        if (includeImages && category.getImages() != null) {
            dto.setImages(toImageDtoList(category.getImages()));
        }

        return dto;
    }
}