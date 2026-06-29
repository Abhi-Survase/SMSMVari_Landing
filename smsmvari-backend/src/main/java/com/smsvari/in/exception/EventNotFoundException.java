package com.smsvari.in.exception;

/**
 * Thrown when an Event cannot be found by the given identifier (UUID or slug).
 * Maps to HTTP 404 Not Found via {@link GlobalExceptionHandler}.
 */
public class EventNotFoundException extends RuntimeException {

    public EventNotFoundException(String message) {
        super(message);
    }

    public EventNotFoundException(String field, String value) {
        super("Event not found with " + field + ": " + value);
    }
}
