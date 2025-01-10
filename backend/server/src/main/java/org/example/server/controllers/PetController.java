package org.example.server.controllers;

import jakarta.validation.Valid;
import org.example.server.dto.PetRequestDto;
import org.example.server.dto.PetResponseDto;
import org.example.server.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
public class PetController {
    @Autowired
    private PetService petService;

    // 등록페이지 - 반려동물 추가
    @PostMapping
    public ResponseEntity<PetResponseDto> createPet(@Valid @RequestBody PetRequestDto request) {
        PetResponseDto pet = petService.createPet(request);
        return ResponseEntity.ok(pet);
    }

    // 등록페이지 - 반려동물 조회
    @GetMapping("/{userId}/{diseaseId}/{petTypeId}")
    public ResponseEntity<PetResponseDto> getPet(
            @PathVariable Long userId,
            @PathVariable Long diseaseId,
            @PathVariable Long petTypeId) {

        PetResponseDto petResponseDto = petService.getPet(userId, diseaseId, petTypeId);
        return ResponseEntity.ok(petResponseDto);
    }

    // 등록페이지 - 반려동물 수정
    @PutMapping("/{userId}/{diseaseId}/{petTypeId}")
    public ResponseEntity<PetResponseDto> updatePet(
            @PathVariable Long userId,
            @PathVariable Long diseaseId,
            @PathVariable Long petTypeId,
            @RequestBody PetRequestDto request) {

        PetResponseDto petResponseDto = petService.updatePet(userId, diseaseId, petTypeId, request);

        return ResponseEntity.ok(petResponseDto);
    }

    // 마이페이지 반려동물 목록 조회
    @GetMapping("/{userId}")
    public List<PetResponseDto> getPetsByUserId(@PathVariable Long userId) {
        return petService.getPetsByUserId(userId);
    }

}
