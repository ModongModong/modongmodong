package org.example.server.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder

public class PetResponseDto {
    private Long userId;
    private Long diseaseId;
    private Long petTypeId;
    private String name;
    private Integer age;
    private String gender;
    private String neuteringYn;
    private Integer animalNumber;
    private Float weight;
    private String surgery;
}