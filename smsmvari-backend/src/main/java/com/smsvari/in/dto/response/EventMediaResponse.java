package com.smsvari.in.dto.response;

import lombok.*;

import java.time.LocalDateTime;

/**
 * Response DTO for a single event media item.
 * Returned by all media gallery endpoints.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventMediaResponse {

    private String  uuid;

    // ── file ──────────────────────────────────────────────────────────────────

    /** Full-size WebP image URL. */
    private String  fileUrl;

    /**
     * Thumbnail WebP URL (400 × 300 cover-crop).
     * Null when no thumbnail was generated.
     */
    private String  thumbnailUrl;

    /** Original filename as submitted by the client. */
    private String  originalFileName;

    /** MIME type of the stored file (e.g. {@code image/webp}). */
    private String  mimeType;

    /** File size of the stored main image in bytes. */
    private Long    fileSize;

    /** Width in pixels of the stored main image. */
    private Integer width;

    /** Height in pixels of the stored main image. */
    private Integer height;

    // ── display ───────────────────────────────────────────────────────────────

    private String  caption;
    private Integer displayOrder;
    private Boolean active;

    // ── audit ─────────────────────────────────────────────────────────────────

    /** Full name of the admin who uploaded this item. */
    private String        uploadedByName;

    /** Email of the admin who uploaded this item. */
    private String        uploadedByEmail;

    private LocalDateTime createdAt;
}