package com.smsvari.in.repository;

import com.smsvari.in.entity.GalleryCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GalleryCategoryRepository extends JpaRepository<GalleryCategory, Long> {

    Optional<GalleryCategory> findByUuid(String uuid);

    Optional<GalleryCategory> findByName(String name);

    boolean existsByName(String name);

    boolean existsByNameAndUuidNot(String name, String uuid);

    // Admin: all categories (active + inactive) with pagination
    Page<GalleryCategory> findAll(Pageable pageable);

    // Public: only active categories
    Page<GalleryCategory> findAllByActiveTrue(Pageable pageable);

    List<GalleryCategory> findAllByActiveTrueOrderByNameAsc();

    // Count images per category
    @Query("SELECT c, COUNT(i) FROM GalleryCategory c LEFT JOIN c.images i " +
            "WHERE c.uuid = :uuid GROUP BY c")
    Optional<Object[]> findByUuidWithImageCount(@Param("uuid") String uuid);
}