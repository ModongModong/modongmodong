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
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class PetController {
    @Autowired
    private PetService petService;

    // 등록페이지 - 반려동물 추가
    @PostMapping
    public ResponseEntity<PetResponseDto> createPet(@Valid @RequestBody PetRequestDto request) {
        PetResponseDto pet = petService.createPet(request);
        return ResponseEntity.ok(pet);
    }

    // 수정페이지 - 반려동물 조회
    @GetMapping("/{petId}")
    public ResponseEntity<PetResponseDto> getPet(@PathVariable Long petId) {
        PetResponseDto petResponseDto = petService.getPet(petId);
        return ResponseEntity.ok(petResponseDto);
    }

    // 수정페이지 - 반려동물 수정
    @PutMapping("/{petId}")
    public ResponseEntity<PetResponseDto> updatePet(
            @PathVariable Long petId,
            @RequestBody PetRequestDto request) {

        PetResponseDto petResponseDto = petService.updatePet(petId, request);
        return ResponseEntity.ok(petResponseDto);
    }

    // 마이페이지 - 반려동물 목록 조회
    @GetMapping("/user/{userId}")
    public List<PetResponseDto> getPetsByUserId(@PathVariable Long userId) {
        return petService.getPetsByUserId(userId);
    }
}