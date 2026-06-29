package com.smsvari.in.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class ReorderMediaRequest {

    @NotEmpty(message = "orderedUuids must not be empty")
    private List<String> orderedUuids;
}