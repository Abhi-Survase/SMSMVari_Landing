package com.smsvari.in.entity;

import com.smsvari.in.enums.EventStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Represents a publicly visible event managed by the admin panel.
 *
 * <p>Cover image is stored locally as WebP via {@link com.smsvari.in.services.ImageProcessingService}.
 * {@code coverStoredFileName} is the on-disk filename needed to delete the old file
 * when the cover is replaced or removed.</p>
 */
@Entity
@Table(
        name = "events",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "uuid"),
                @UniqueConstraint(columnNames = "slug")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, updatable = false, length = 36)
    private String uuid;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, unique = true, length = 255)
    private String slug;

    @Lob
    private String description;

    @Column(nullable = false, length = 100)
    private String category;

    /** Public URL of the cover WebP image. */
    @Column(length = 500)
    private String coverImageUrl;

    /**
     * On-disk filename of the cover WebP (e.g. {@code abc123.webp}).
     * Used internally by {@link com.smsvari.in.services.EventMediaService} to
     * delete the old cover file when it is replaced or removed.
     * Not exposed in any response DTO.
     */
    @Column(length = 255)
    private String coverStoredFileName;

    @Column(length = 255)
    private String location;

    @Column(nullable = false)
    private LocalDate startDate;

    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EventStatus status;

    /**
     * When {@code true}, the admin has manually set {@link #status} via the
     * admin panel, and the {@code EventStatusScheduler} will skip this event
     * during its automatic UPCOMING -> ONGOING -> COMPLETED recalculation.
     * Cleared via the "reset to automatic" admin endpoint.
     */
    @Column(nullable = false)
    @Builder.Default
    private Boolean statusOverridden = false;

    @Column(nullable = false)
    private Boolean featured;

    @Column(nullable = false)
    private Boolean published;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "created_by",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_event_created_by")
    )
    private User createdBy;

    @OneToMany(
            mappedBy = "event",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @OrderBy("displayOrder ASC, createdAt ASC")
    @Builder.Default
    private List<EventMedia> media = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        if (uuid == null) {
            uuid = UUID.randomUUID().toString();
        }
        if (status == null) {
            status = EventStatus.UPCOMING;
        }
        if (statusOverridden == null) {
            statusOverridden = false;
        }
        if (featured == null) {
            featured = false;
        }
        if (published == null) {
            published = true;
        }
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}