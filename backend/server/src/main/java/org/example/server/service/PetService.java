package org.example.server.service;

import jakarta.servlet.http.HttpServletRequest;
import org.example.server.dto.PetRequestDto;
import org.example.server.dto.PetResponseDto;
import org.example.server.entities.Disease;
import org.example.server.entities.Pet;
import org.example.server.entities.PetType;
import org.example.server.entities.User;
import org.example.server.repository.DiseaseRepository;
import org.example.server.repository.PetRepository;

import org.example.server.repository.PetTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private DiseaseRepository diseaseRepository;

    @Autowired
    private PetTypeRepository petTypeRepository;

    // 등록페이지 - 반려동물 추가
    public PetResponseDto createPet(PetRequestDto request, HttpServletRequest httpRequest) {
        User user = (User) httpRequest.getSession().getAttribute("user");

        if (user == null) {
            throw new RuntimeException("로그인된 사용자가 없습니다.");
        }

        // Pet 객체 설정
        Pet pet = new Pet();
        setPetDetails(pet, request);

        // Pet 저장
        pet = petRepository.save(pet);

        // PetResponseDto 반환
        return convertToPetResponseDto(pet);
    }

    // 등록페이지 - 반려동물 조회
    public PetResponseDto getPet(Long petId, HttpServletRequest httpRequest) {
        User user = (User) httpRequest.getSession().getAttribute("user");

        if (user == null) {
            throw new RuntimeException("로그인된 사용자가 없습니다.");
        }

        // petId로 Pet 조회
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("반려동물을 찾을 수 없습니다:" + petId));

        // PetResponseDto 반환
        return convertToPetResponseDto(pet);
    }

    // 등록페이지 - 반려동물 수정
    public PetResponseDto updatePet(Long petId, PetRequestDto request, HttpServletRequest httpRequest) {
        User user = (User) httpRequest.getSession().getAttribute("user");

        if (user == null) {
            throw new RuntimeException("로그인된 사용자가 없습니다.");
        }
        // 기존 Pet을 petId로 조회
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("반려동물을 찾을 수 없습니다:" + petId));

        if (!pet.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("수정 권한이 없습니다.");
        }

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
        pet.setDiseaseId(request.getDiseaseId());
        pet.setPetTypeId(request.getPetTypeId());
        pet.setName(request.getName());
        pet.setAge(request.getAge());
        pet.setGender(request.getGender());
        pet.setNeuteuringYn(request.getNeuteuringYn());
        pet.setAnimalNumber(request.getAnimalNumber());
        pet.setWeight(request.getWeight());
        pet.setSurgery(request.getSurgery());

        // Disease와 PetType 엔티티를 조회하여 설정
        Disease disease = diseaseRepository.findById(request.getDiseaseId())
                .orElseThrow(() -> new RuntimeException("Disease not found"));
        PetType petType = petTypeRepository.findById(request.getPetTypeId())
                .orElseThrow(() -> new RuntimeException("PetType not found"));
        pet.setDisease(disease);
        pet.setPetType(petType);
    }

    // Pet -> PetResponseDto 변환 메서드
    private PetResponseDto convertToPetResponseDto(Pet pet) {
        return PetResponseDto.builder()
                .petId(pet.getPetId())
                .userId(pet.getUserId())
                .diseaseId(pet.getDiseaseId())
                .disease(pet.getDisease() != null ? pet.getDisease().getDiseaseName() : "")
                .petTypeId(pet.getPetTypeId())
                .petType(pet.getPetType() != null ? pet.getPetType().getPetTypeName() : "")
                .name(pet.getName())
                .age(pet.getAge())
                .gender(pet.getGender())
                .neuteuringYn(pet.getNeuteuringYn())
                .animalNumber(pet.getAnimalNumber())
                .weight(pet.getWeight())
                .surgery(pet.getSurgery())
                .build();
    }
}
