package com.smsvari.in.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GalleryImageDto {

    private String uuid;
    private String originalFileName;
    private String storedFileName;
    private String imageUrl;
    private String thumbnailUrl;
    private Long fileSize;
    private Integer width;
    private Integer height;
    private String mimeType;
    private Boolean featured;
    private Boolean active;
    private Integer displayOrder;
    private String categoryUuid;
    private String categoryName;
    private String createdByUuid;
    private String createdByName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}