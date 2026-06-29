package com.smsvari.in.repository;

import com.smsvari.in.entity.Event;
import com.smsvari.in.entity.EventMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for {@link EventMedia} entities.
 */
@Repository
public interface EventMediaRepository extends JpaRepository<EventMedia, Long> {

    Optional<EventMedia> findByUuid(String uuid);

    Optional<EventMedia> findByUuidAndEvent(String uuid, Event event);

    List<EventMedia> findAllByEventAndActiveTrueOrderByDisplayOrderAsc(Event event);

    List<EventMedia> findAllByEventAndActiveTrueOrderByDisplayOrderAscCreatedAtAsc(Event event);

    List<EventMedia> findAllByEventOrderByDisplayOrderAsc(Event event);

    long countByEventAndActiveTrue(Event event);

    @Query("SELECT MAX(em.displayOrder) FROM EventMedia em WHERE em.event = :event")
    Optional<Integer> findMaxDisplayOrderByEvent(@Param("event") Event event);

}
