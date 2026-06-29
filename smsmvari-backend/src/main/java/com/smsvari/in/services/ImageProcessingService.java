package com.smsvari.in.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageProcessingService {

    ProcessedImage process(MultipartFile file) throws IOException;

    void delete(String storedFileName, String thumbnailFileName);

    record ProcessedImage(
            String storedFileName,
            String thumbnailFileName,
            String imageUrl,
            String thumbnailUrl,
            long fileSize,
            int width,
            int height,
            String originalMimeType
    ) {}
}