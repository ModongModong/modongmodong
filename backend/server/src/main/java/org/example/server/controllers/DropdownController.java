package org.example.server.controllers;

import org.example.server.dto.DiseaseResponseDto;
import org.example.server.dto.PetTypeResponseDto;
import org.example.server.service.DiseaseService;
import org.example.server.service.PetTypeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/get-list")
public class DropdownController {

    private final PetTypeService petTypeService;
    private final DiseaseService diseaseService;

    public DropdownController(PetTypeService petTypeService, DiseaseService diseaseService) {
        this.petTypeService = petTypeService;
        this.diseaseService = diseaseService;
    }

    // 품종 목록
    @GetMapping("/pet_type")
    public List<PetTypeResponseDto> getAllPetTypes() {
        return petTypeService.getAllPetTypes();
    }

    // 질병 목록
    @GetMapping("/disease")
    public List<DiseaseResponseDto> getAllDiseases() {
        return diseaseService.getAllDiseases();
    }
}
