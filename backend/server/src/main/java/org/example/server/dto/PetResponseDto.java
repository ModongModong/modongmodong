package org.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class PetResponseDto {
    private Long petId;
    private Long userId;
    private Long diseaseId;
    private String disease;
    private Long petTypeId;
    private String petType;

    private String name;
    private Integer age;
    private String gender;
    private String neuteringYn;
    private Integer animalNumber;
    private Float weight;
    private String surgery;
}