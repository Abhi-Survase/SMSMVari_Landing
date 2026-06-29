package com.smsvari.in.repository;

import com.smsvari.in.entity.GalleryCategory;
import com.smsvari.in.entity.GalleryImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GalleryImageRepository extends JpaRepository<GalleryImage, Long> {

    Optional<GalleryImage> findByUuid(String uuid);

    boolean existsByStoredFileName(String storedFileName);

    // Admin: all images with optional category filter
    Page<GalleryImage> findByCategory(GalleryCategory category, Pageable pageable);

    Page<GalleryImage> findAll(Pageable pageable);

    // Public: active images only
    Page<GalleryImage> findByCategoryAndActiveTrue(GalleryCategory category, Pageable pageable);

    Page<GalleryImage> findAllByActiveTrue(Pageable pageable);

    // Featured images for public display
    List<GalleryImage> findAllByFeaturedTrueAndActiveTrueOrderByDisplayOrderAsc();

    // All images in a category ordered by displayOrder
    List<GalleryImage> findByCategoryOrderByDisplayOrderAsc(GalleryCategory category);

    List<GalleryImage> findByCategoryAndActiveTrueOrderByDisplayOrderAsc(GalleryCategory category);

    // Count images in category
    long countByCategory(GalleryCategory category);

    long countByCategoryAndActiveTrue(GalleryCategory category);

    // Images without a category
    Page<GalleryImage> findByCategoryIsNull(Pageable pageable);

    Page<GalleryImage> findByCategoryIsNullAndActiveTrue(Pageable pageable);

    // Bulk update display order
    @Modifying
    @Query("UPDATE GalleryImage i SET i.displayOrder = :order WHERE i.uuid = :uuid")
    void updateDisplayOrder(@Param("uuid") String uuid, @Param("order") int order);
}