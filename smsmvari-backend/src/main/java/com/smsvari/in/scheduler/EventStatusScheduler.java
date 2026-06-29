package com.smsvari.in.scheduler;

import com.smsvari.in.services.EventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class EventStatusScheduler {

    private final EventService eventService;

    /**
     * Runs daily at midnight to flip UPCOMING -> ONGOING -> COMPLETED
     * automatically as dates pass. Skips CANCELLED events and any event
     * the admin has manually overridden (statusOverridden = true).
     */
    @Scheduled(cron = "0 0 0 * * *")
    public void refreshEventStatuses() {
        log.info("Running scheduled event status refresh");
        eventService.recalculateEventStatuses();
    }
}