package org.example.server.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PetRequestDto {
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