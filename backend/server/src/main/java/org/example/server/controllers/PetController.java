package org.example.server.controllers;

import jakarta.validation.Valid;
import org.example.server.dto.PetRequestDto;
import org.example.server.dto.PetResponseDto;
import org.example.server.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/pets")
public class PetController {
    @Autowired
    private PetService petService;

    // 반려동물 추가
    @PostMapping
    public ResponseEntity<PetResponseDto> createPet(@Valid @RequestBody PetRequestDto request) {
        PetResponseDto pet = petService.createPet(request);
        return ResponseEntity.ok(pet);
    }

}
