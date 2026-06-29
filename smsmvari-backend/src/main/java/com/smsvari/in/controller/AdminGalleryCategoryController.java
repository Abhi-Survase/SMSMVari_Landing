package com.smsvari.in.controller;

import com.smsvari.in.dto.response.ApiResponse;
import com.smsvari.in.dto.GalleryCategoryDto;
import com.smsvari.in.dto.response.PagedResponse;
import com.smsvari.in.dto.request.CreateCategoryRequest;
import com.smsvari.in.dto.request.UpdateCategoryRequest;
import com.smsvari.in.services.GalleryCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * Admin-only CRUD for gallery categories.
 *
 * Base path: /api/admin/gallery/categories
 */
@RestController
@RequestMapping("/api/admin/gallery/categories")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminGalleryCategoryController {

    private final GalleryCategoryService categoryService;

    // ── POST /api/admin/gallery/categories ───────────────────────────────────
    @PostMapping
    public ResponseEntity<ApiResponse<GalleryCategoryDto>> create(
            @Valid @RequestBody CreateCategoryRequest request,
            @AuthenticationPrincipal String userUuid) {

        GalleryCategoryDto dto = categoryService.create(request, userUuid);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Category created successfully.", dto));
    }

    // ── GET /api/admin/gallery/categories ────────────────────────────────────
    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<GalleryCategoryDto>>> listAll(
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        PagedResponse<GalleryCategoryDto> data =
                categoryService.listAll(PageRequest.of(page, size, sort));

        return ResponseEntity.ok(ApiResponse.success("Categories fetched.", data));
    }

    // ── GET /api/admin/gallery/categories/{uuid} ─────────────────────────────
    @GetMapping("/{uuid}")
    public ResponseEntity<ApiResponse<GalleryCategoryDto>> getByUuid(
            @PathVariable String uuid) {

        return ResponseEntity.ok(
                ApiResponse.success("Category fetched.", categoryService.getByUuid(uuid)));
    }

    // ── PUT /api/admin/gallery/categories/{uuid} ─────────────────────────────
    @PutMapping("/{uuid}")
    public ResponseEntity<ApiResponse<GalleryCategoryDto>> update(
            @PathVariable String uuid,
            @Valid @RequestBody UpdateCategoryRequest request) {

        GalleryCategoryDto dto = categoryService.update(uuid, request);
        return ResponseEntity.ok(ApiResponse.success("Category updated successfully.", dto));
    }

    // ── DELETE /api/admin/gallery/categories/{uuid} ──────────────────────────
    @DeleteMapping("/{uuid}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String uuid) {
        categoryService.delete(uuid);
        return ResponseEntity.ok(ApiResponse.success("Category deleted successfully."));
    }

    // ── PATCH /api/admin/gallery/categories/{uuid}/toggle-active ─────────────
    @PatchMapping("/{uuid}/toggle-active")
    public ResponseEntity<ApiResponse<GalleryCategoryDto>> toggleActive(
            @PathVariable String uuid) {

        GalleryCategoryDto current = categoryService.getByUuid(uuid);
        UpdateCategoryRequest req  = new UpdateCategoryRequest();
        req.setActive(!current.getActive());

        GalleryCategoryDto updated = categoryService.update(uuid, req);
        return ResponseEntity.ok(ApiResponse.success(
                "Category " + (updated.getActive() ? "activated" : "deactivated") + ".", updated));
    }
}