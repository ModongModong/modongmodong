package org.example.server.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PetResponseDto {
    // 복합키들은 name이 같이 나타나게
    private Long userId;
    private String userName;
    private Long diseaseId;
    private String diseaseName;
    private Long petTypeId;
    private String petTypeName;

    private String name;
    private Integer age;
    private String gender;
    private String neuteringYn;
    private Integer animalNumber;
    private Float weight;
    private String surgery;
}