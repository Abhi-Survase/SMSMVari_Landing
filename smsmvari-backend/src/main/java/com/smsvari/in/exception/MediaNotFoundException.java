package com.smsvari.in.exception;

public class MediaNotFoundException extends RuntimeException {
    public MediaNotFoundException(String uuid) {
        super("Media not found with uuid: " + uuid);
    }
}