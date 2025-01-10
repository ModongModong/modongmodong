package org.example.server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class PetRequestDto {
    private Long petId;
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