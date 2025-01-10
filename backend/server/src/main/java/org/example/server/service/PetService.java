package org.example.server.service;

import org.example.server.dto.PetRequestDto;
import org.example.server.dto.PetResponseDto;
import org.example.server.entities.Pet;
import org.example.server.repository.PetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    // 등록페이지 - 반려동물 추가
    @Transactional
    public PetResponseDto createPet(PetRequestDto request) {
        // Pet 객체 설정
        Pet pet = new Pet();
        setPetDetails(pet, request);

        // Pet 저장
        pet = petRepository.save(pet);

        // PetResponseDto 반환
        return convertToPetResponseDto(pet);
    }

    // 등록페이지 - 반려동물 조회
    @Transactional
    public PetResponseDto getPet(Long petId) {
        // petId로 Pet 조회
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet not found with id " + petId));

        // PetResponseDto 반환
        return convertToPetResponseDto(pet);
    }

    // 등록페이지 - 반려동물 수정
    @Transactional
    public PetResponseDto updatePet(Long petId, PetRequestDto request) {
        // 기존 Pet을 petId로 조회
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet not found with id " + petId));

        // 수정할 값 설정
        setPetDetails(pet, request);

        // 수정된 Pet 저장
        pet = petRepository.save(pet);

        // PetResponseDto 반환
        return convertToPetResponseDto(pet);
    }

    // 마이페이지 - 반려동물 목록 조회
    public List<PetResponseDto> getPetsByUserId(Long userId) {
        List<Pet> pets = petRepository.findByUserId(userId);
        return pets.stream()
                .map(this::convertToPetResponseDto)
                .collect(Collectors.toList());
    }

    private void setPetDetails(Pet pet, PetRequestDto request) {
        pet.setUserId(request.getUserId());
        pet.setDiseaseId(request.getDiseaseId());
        pet.setPetTypeId(request.getPetTypeId());
        pet.setName(request.getName());
        pet.setAge(request.getAge());
        pet.setGender(request.getGender());
        pet.setNeuteringYn(request.getNeuteringYn());
        pet.setAnimalNumber(request.getAnimalNumber());
        pet.setWeight(request.getWeight());
        pet.setSurgery(request.getSurgery());
    }

    // Pet -> PetResponseDto 변환 메서드
    private PetResponseDto convertToPetResponseDto(Pet pet) {
        return PetResponseDto.builder()
                .petId(pet.getPetId())
                .userId(pet.getUserId())
                .diseaseId(pet.getDiseaseId())
                .petTypeId(pet.getPetTypeId())
                .name(pet.getName())
                .age(pet.getAge())
                .gender(pet.getGender())
                .neuteringYn(pet.getNeuteringYn())
                .animalNumber(pet.getAnimalNumber())
                .weight(pet.getWeight())
                .surgery(pet.getSurgery())
                .build();
    }
}
