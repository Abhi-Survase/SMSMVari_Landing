package com.smsvari.in.repository;

import com.smsvari.in.entity.Event;
import com.smsvari.in.entity.User;
import com.smsvari.in.enums.EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for {@link Event} entities.
 */
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    // ── lookup ───────────────────────────────────────────────────────────────

    Optional<Event> findByUuid(String uuid);

    Optional<Event> findBySlugAndPublishedTrue(String slug);

    boolean existsBySlug(String slug);

    // ── admin listings ───────────────────────────────────────────────────────

    /** All events ordered by start date desc (most recent first). */
    List<Event> findAllByOrderByStartDateDesc();

    List<Event> findAllByStatus(EventStatus status);

    List<Event> findAllByCategory(String category);

    List<Event> findAllByCreatedBy(User user);

    // ── admin: date-range filter ─────────────────────────────────────────────

    /** Events whose startDate is on or after {@code from}, start date desc. */
    List<Event> findAllByStartDateGreaterThanEqualOrderByStartDateDesc(LocalDate from);

    /** Events whose startDate is on or before {@code to}, start date desc. */
    List<Event> findAllByStartDateLessThanEqualOrderByStartDateDesc(LocalDate to);

    /** Events whose startDate falls in [from, to] inclusive, start date desc. */
    List<Event> findAllByStartDateBetweenOrderByStartDateDesc(LocalDate from, LocalDate to);

    // ── public: published listings ───────────────────────────────────────────

    /**
     * All published UPCOMING events, nearest first.
     * Used by the public /upcoming endpoint.
     */
    List<Event> findAllByPublishedTrueAndStatusOrderByStartDateAsc(EventStatus status);

    /**
     * All published COMPLETED events, most recent first.
     * Used by the public /past endpoint.
     */
    List<Event> findAllByPublishedTrueAndStatusOrderByStartDateDesc(EventStatus status);

    /**
     * All published events in a specific category and status.
     * Used to build category-filtered lists per status bucket.
     */
    List<Event> findAllByPublishedTrueAndCategoryAndStatusOrderByStartDateAsc(
            String category, EventStatus status);

    List<Event> findAllByPublishedTrueAndCategoryAndStatusOrderByStartDateDesc(
            String category, EventStatus status);

    /** Featured published events. */
    List<Event> findAllByPublishedTrueAndFeaturedTrueAndStatus(EventStatus status);

    /**
     * Featured published events — all statuses, ordered by status priority
     * then startDate. The CASE ordering ensures UPCOMING → ONGOING → COMPLETED.
     */
    @Query("""
            SELECT e FROM Event e
            WHERE e.published = true AND e.featured = true
            ORDER BY
                CASE e.status
                    WHEN 'UPCOMING'  THEN 1
                    WHEN 'ONGOING'   THEN 2
                    WHEN 'COMPLETED' THEN 3
                    ELSE 4
                END ASC,
                e.startDate ASC
            """)
    List<Event> findFeaturedPublishedEvents();

    /**
     * All published events ordered by status priority then startDate.
     * UPCOMING (nearest first) → ONGOING (nearest first) → COMPLETED (most recent first).
     *
     * <p>The secondary sort for COMPLETED uses DESC start date so the most recent
     * past event appears at the top of that group.  JPQL doesn't support
     * conditional sort direction, so COMPLETED uses a negative epoch trick:
     * negate startDate ordinal isn't possible in JPQL — instead we use two
     * separate queries merged in the service layer (see {@link com.smsvari.in.services.impl.EventServiceImpl}).</p>
     */
    @Query("""
            SELECT e FROM Event e
            WHERE e.published = true
              AND e.status IN ('UPCOMING', 'ONGOING')
            ORDER BY
                CASE e.status
                    WHEN 'UPCOMING' THEN 1
                    WHEN 'ONGOING'  THEN 2
                    ELSE 3
                END ASC,
                e.startDate ASC
            """)
    List<Event> findPublishedUpcomingAndOngoing();

    /** Distinct categories that have ≥1 published event, alphabetically sorted. */
    @Query("SELECT DISTINCT e.category FROM Event e WHERE e.published = true ORDER BY e.category ASC")
    List<String> findDistinctPublishedCategories();

    // ── stats ────────────────────────────────────────────────────────────────

    long countByPublishedTrue();

    List<Event> findAllByStatusNotAndStatusOverriddenFalse(EventStatus eventStatus);
}