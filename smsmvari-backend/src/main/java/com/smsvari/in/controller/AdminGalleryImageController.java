package com.smsvari.in.controller;

import com.smsvari.in.dto.GalleryImageDto;
import com.smsvari.in.dto.request.ReorderImagesRequest;
import com.smsvari.in.dto.request.UpdateImageRequest;
import com.smsvari.in.dto.response.ApiResponse;
import com.smsvari.in.dto.response.PagedResponse;
import com.smsvari.in.services.GalleryImageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * Admin-only CRUD for gallery images.
 *
 * Base path: /api/admin/gallery/images
 */
@RestController
@RequestMapping("/api/admin/gallery/images")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminGalleryImageController {

    private final GalleryImageService imageService;

    // ── POST /api/admin/gallery/images/upload ────────────────────────────────
    /**
     * Upload a single image.
     * Form fields: file (required), categoryUuid (optional), featured (optional), displayOrder (optional)
     */
    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<GalleryImageDto>> upload(
            @RequestPart("file") MultipartFile file,
            @RequestParam(required = false) String categoryUuid,
            @RequestParam(required = false, defaultValue = "false") Boolean featured,
            @RequestParam(required = false, defaultValue = "0") Integer displayOrder,
            @AuthenticationPrincipal String userUuid) throws IOException {

        GalleryImageDto dto = imageService.upload(
                file, categoryUuid, featured, displayOrder, userUuid);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Image uploaded successfully.", dto));
    }

    // ── POST /api/admin/gallery/images/upload/bulk ───────────────────────────
    /**
     * Bulk upload multiple images to a category.
     * Form fields: files[] (required), categoryUuid (optional)
     */
    @PostMapping(value = "/upload/bulk", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<List<GalleryImageDto>>> uploadBulk(
            @RequestPart("files") List<MultipartFile> files,
            @RequestParam(required = false) String categoryUuid,
            @AuthenticationPrincipal String userUuid) throws IOException {

        List<GalleryImageDto> dtos = imageService.uploadBulk(files, categoryUuid, userUuid);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(dtos.size() + " image(s) uploaded successfully.", dtos));
    }

    // ── GET /api/admin/gallery/images ────────────────────────────────────────
    /** List all images (paginated, admin — includes inactive). */
    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<GalleryImageDto>>> listAll(
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        PagedResponse<GalleryImageDto> data =
                imageService.listAll(PageRequest.of(page, size, sort));

        return ResponseEntity.ok(ApiResponse.success("Images fetched.", data));
    }

    // ── GET /api/admin/gallery/images/category/{categoryUuid} ───────────────
    /** List images by category (admin — includes inactive). */
    @GetMapping("/category/{categoryUuid}")
    public ResponseEntity<ApiResponse<PagedResponse<GalleryImageDto>>> listByCategory(
            @PathVariable String categoryUuid,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "displayOrder") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        PagedResponse<GalleryImageDto> data =
                imageService.listByCategory(categoryUuid, PageRequest.of(page, size, sort));

        return ResponseEntity.ok(ApiResponse.success("Images fetched.", data));
    }

    // ── GET /api/admin/gallery/images/uncategorised ──────────────────────────
    /** List images with no category assigned. */
    @GetMapping("/uncategorised")
    public ResponseEntity<ApiResponse<PagedResponse<GalleryImageDto>>> listUncategorised(
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "20") int size) {

        PagedResponse<GalleryImageDto> data =
                imageService.listUncategorised(PageRequest.of(page, size));

        return ResponseEntity.ok(ApiResponse.success("Uncategorised images fetched.", data));
    }

    // ── GET /api/admin/gallery/images/{uuid} ─────────────────────────────────
    @GetMapping("/{uuid}")
    public ResponseEntity<ApiResponse<GalleryImageDto>> getByUuid(@PathVariable String uuid) {
        return ResponseEntity.ok(
                ApiResponse.success("Image fetched.", imageService.getByUuid(uuid)));
    }

    // ── PUT /api/admin/gallery/images/{uuid} ─────────────────────────────────
    /**
     * Update metadata (category, featured flag, active flag, displayOrder).
     * Pass categoryUuid="" (empty string) to remove the category assignment.
     * Pass categoryUuid=null (omit field) to keep the current category.
     */
    @PutMapping("/{uuid}")
    public ResponseEntity<ApiResponse<GalleryImageDto>> update(
            @PathVariable String uuid,
            @Valid @RequestBody UpdateImageRequest request) {

        GalleryImageDto dto = imageService.update(uuid, request);
        return ResponseEntity.ok(ApiResponse.success("Image updated successfully.", dto));
    }

    // ── DELETE /api/admin/gallery/images/{uuid} ──────────────────────────────
    @DeleteMapping("/{uuid}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String uuid) {
        imageService.delete(uuid);
        return ResponseEntity.ok(ApiResponse.success("Image deleted successfully."));
    }

    // ── PATCH /api/admin/gallery/images/{uuid}/toggle-active ─────────────────
    @PatchMapping("/{uuid}/toggle-active")
    public ResponseEntity<ApiResponse<GalleryImageDto>> toggleActive(@PathVariable String uuid) {
        GalleryImageDto current = imageService.getByUuid(uuid);
        UpdateImageRequest req  = new UpdateImageRequest();
        req.setActive(!current.getActive());

        GalleryImageDto updated = imageService.update(uuid, req);
        return ResponseEntity.ok(ApiResponse.success(
                "Image " + (updated.getActive() ? "activated" : "deactivated") + ".", updated));
    }

    // ── PATCH /api/admin/gallery/images/{uuid}/toggle-featured ───────────────
    @PatchMapping("/{uuid}/toggle-featured")
    public ResponseEntity<ApiResponse<GalleryImageDto>> toggleFeatured(@PathVariable String uuid) {
        GalleryImageDto current = imageService.getByUuid(uuid);
        UpdateImageRequest req  = new UpdateImageRequest();
        req.setFeatured(!current.getFeatured());

        GalleryImageDto updated = imageService.update(uuid, req);
        return ResponseEntity.ok(ApiResponse.success(
                "Image " + (updated.getFeatured() ? "marked as featured" : "unfeatured") + ".", updated));
    }

    // ── PATCH /api/admin/gallery/images/reorder ──────────────────────────────
    /**
     * Bulk reorder images by supplying a list of { uuid, displayOrder } pairs.
     */
    @PatchMapping("/reorder")
    public ResponseEntity<ApiResponse<Void>> reorder(
            @Valid @RequestBody ReorderImagesRequest request) {
        imageService.reorder(request);
        return ResponseEntity.ok(ApiResponse.success("Images reordered successfully."));
    }
}