package com.smsvari.in.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GalleryCategoryDto {

    private String uuid;
    private String name;
    private String description;
    private Boolean active;
    private String createdByUuid;
    private String createdByName;
    private Integer imageCount;
    private List<GalleryImageDto> images;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}