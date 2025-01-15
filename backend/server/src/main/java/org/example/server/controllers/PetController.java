package org.example.server.controllers;

import jakarta.servlet.http.HttpServletRequest;
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
    public ResponseEntity<PetResponseDto> createPet(
            @Valid @RequestBody PetRequestDto request,
            HttpServletRequest httpRequest) {

        PetResponseDto pet = petService.createPet(request, httpRequest);
        return ResponseEntity.ok(pet);
    }

    // 수정페이지 - 반려동물 조회
    @GetMapping("/{petId}")
    public ResponseEntity<PetResponseDto> getPet(
            @PathVariable("petId") Long petId,
            HttpServletRequest httpRequest) {

        PetResponseDto petResponseDto = petService.getPet(petId, httpRequest);
        return ResponseEntity.ok(petResponseDto);
    }

    // 수정페이지 - 반려동물 수정
    @PutMapping("/{petId}")
    public ResponseEntity<PetResponseDto> updatePet(
            @PathVariable("petId") Long petId,
            @RequestBody PetRequestDto request,
            HttpServletRequest httpRequest) {

        PetResponseDto updatedPet = petService.updatePet(petId, request, httpRequest);
        return ResponseEntity.ok(updatedPet);
    }

    // 마이페이지 - 반려동물 목록 조회
    @GetMapping("/user/{userId}")
    public List<PetResponseDto> getPetsByUserId(@PathVariable Long userId) {
        return petService.getPetsByUserId(userId);
    }
}