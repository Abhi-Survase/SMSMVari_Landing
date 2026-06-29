package com.smsvari.in.controller;

import com.smsvari.in.dto.GalleryCategoryDto;
import com.smsvari.in.dto.GalleryImageDto;
import com.smsvari.in.dto.response.ApiResponse;
import com.smsvari.in.dto.response.PagedResponse;
import com.smsvari.in.services.GalleryCategoryService;
import com.smsvari.in.services.GalleryImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Public (unauthenticated) gallery endpoints.
 *
 * Base path: /api/gallery
 */
@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
public class PublicGalleryController {

    private final GalleryImageService    imageService;
    private final GalleryCategoryService categoryService;

    // ── Categories ───────────────────────────────────────────────────────────

    /**
     * GET /api/gallery/categories
     * Paginated list of active categories with their active image counts.
     */
    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<PagedResponse<GalleryCategoryDto>>> listCategories(
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        PagedResponse<GalleryCategoryDto> data =
                categoryService.listActive(PageRequest.of(page, size, sort));

        return ResponseEntity.ok(ApiResponse.success("Categories fetched.", data));
    }

    /**
     * GET /api/gallery/categories/all
     * Flat list of all active categories — useful for nav menus and dropdowns.
     */
    @GetMapping("/categories/all")
    public ResponseEntity<ApiResponse<List<GalleryCategoryDto>>> listCategoriesFlat() {
        return ResponseEntity.ok(
                ApiResponse.success("Categories fetched.", categoryService.listActiveFlat()));
    }

    /**
     * GET /api/gallery/categories/{uuid}
     * Single active category with its active images embedded.
     */
    @GetMapping("/categories/{uuid}")
    public ResponseEntity<ApiResponse<GalleryCategoryDto>> getCategory(
            @PathVariable String uuid) {
        return ResponseEntity.ok(
                ApiResponse.success("Category fetched.", categoryService.getActiveByUuid(uuid)));
    }

    // ── Images ────────────────────────────────────────────────────────────────

    /**
     * GET /api/gallery/images
     * Paginated list of all active images across all categories.
     */
    @GetMapping("/images")
    public ResponseEntity<ApiResponse<PagedResponse<GalleryImageDto>>> listImages(
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "displayOrder") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        PagedResponse<GalleryImageDto> data =
                imageService.listActiveAll(PageRequest.of(page, size, sort));

        return ResponseEntity.ok(ApiResponse.success("Images fetched.", data));
    }

    /**
     * GET /api/gallery/images/category/{categoryUuid}
     * Paginated active images filtered by category — the main filtering endpoint.
     */
    @GetMapping("/images/category/{categoryUuid}")
    public ResponseEntity<ApiResponse<PagedResponse<GalleryImageDto>>> listImagesByCategory(
            @PathVariable String categoryUuid,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "displayOrder") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        PagedResponse<GalleryImageDto> data =
                imageService.listActiveByCategoryUuid(categoryUuid, PageRequest.of(page, size, sort));

        return ResponseEntity.ok(ApiResponse.success("Images fetched.", data));
    }

    /**
     * GET /api/gallery/images/featured
     * Ordered list of featured active images — for hero carousels / spotlights.
     */
    @GetMapping("/images/featured")
    public ResponseEntity<ApiResponse<List<GalleryImageDto>>> listFeatured() {
        return ResponseEntity.ok(
                ApiResponse.success("Featured images fetched.", imageService.listFeatured()));
    }

    /**
     * GET /api/gallery/images/{uuid}
     * Single active image by UUID.
     */
    @GetMapping("/images/{uuid}")
    public ResponseEntity<ApiResponse<GalleryImageDto>> getImage(@PathVariable String uuid) {
        return ResponseEntity.ok(
                ApiResponse.success("Image fetched.", imageService.getActiveByUuid(uuid)));
    }
}