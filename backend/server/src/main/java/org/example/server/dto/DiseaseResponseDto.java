package org.example.server.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DiseaseResponseDto {
    private Long id;
    private String name;
}