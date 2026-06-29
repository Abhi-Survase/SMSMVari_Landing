package com.smsvari.in.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Represents a single media item (image/video) attached to an {@link Event}.
 *
 * <p>Images are stored as WebP (main + thumbnail) via {@link com.smsvari.in.services.ImageProcessingService}.
 * The {@code uploadedBy} field records which admin uploaded this file.</p>
 */
@Entity
@Table(
        name = "event_media",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "uuid")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, updatable = false, length = 36)
    private String uuid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "event_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_event_media_event")
    )
    private Event event;

    // ── file storage ─────────────────────────────────────────────────────────

    /** Public URL of the full-size WebP image. */
    @Column(nullable = false, length = 500)
    private String fileUrl;

    /**
     * Public URL of the thumbnail WebP (400 × 300 cover-crop).
     * Null for non-image uploads (video, PDF).
     */
    @Column(length = 500)
    private String thumbnailUrl;

    /**
     * Stored filename on disk (e.g. {@code <uuid>.webp}).
     * Used internally to locate the file for deletion.
     */
    @Column(length = 255)
    private String storedFileName;

    /**
     * Stored thumbnail filename on disk (e.g. {@code <uuid>_thumb.webp}).
     * Null when no thumbnail was generated.
     */
    @Column(length = 255)
    private String thumbnailFileName;

    /** Original client-side filename — preserved for display / audit. */
    @Column(length = 255)
    private String originalFileName;

    /** MIME type of the stored file (always {@code image/webp} for processed images). */
    @Column(length = 50)
    private String mimeType;

    /** File size in bytes of the stored main file. */
    private Long fileSize;

    /** Width in pixels of the stored main image. */
    private Integer width;

    /** Height in pixels of the stored main image. */
    private Integer height;

    // ── display ───────────────────────────────────────────────────────────────

    @Column(length = 255)
    private String caption;

    @Column(nullable = false)
    private Integer displayOrder;

    @Column(nullable = false)
    private Boolean active;

    // ── audit ─────────────────────────────────────────────────────────────────

    /**
     * The admin who uploaded this media item.
     * Resolved from the JWT security context at upload time.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "uploaded_by",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_event_media_uploaded_by")
    )
    private User uploadedBy;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // ── lifecycle ─────────────────────────────────────────────────────────────

    @PrePersist
    public void prePersist() {
        if (uuid == null) {
            uuid = UUID.randomUUID().toString();
        }
        if (displayOrder == null) {
            displayOrder = 0;
        }
        if (active == null) {
            active = true;
        }
        createdAt = LocalDateTime.now();
    }
}