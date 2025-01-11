package org.example.server.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PetTypeResponseDto {
    private Long id;
    private String name;
}