package org.example.server.service;

import org.example.server.dto.PetRequestDto;
import org.example.server.dto.PetResponseDto;
import org.example.server.entities.Pet;
import org.example.server.entities.User;
import org.example.server.entities.Disease;
import org.example.server.entities.PetType;
import org.example.server.repository.PetRepository;
import org.example.server.repository.UserRepository;
import org.example.server.repository.DiseaseRepository;
import org.example.server.repository.PetTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DiseaseRepository diseaseRepository;

    @Autowired
    private PetTypeRepository petTypeRepository;

    // 등록페이지 - 반려동물 추가
    @Transactional
    public PetResponseDto createPet(PetRequestDto request) {
        // userId, diseaseId, petTypeId를 사용하여 엔티티 조회
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + request.getUserId()));

        Disease disease = diseaseRepository.findById(request.getDiseaseId())
                .orElseThrow(() -> new RuntimeException("Disease not found with id " + request.getDiseaseId()));

        PetType petType = petTypeRepository.findById(request.getPetTypeId())
                .orElseThrow(() -> new RuntimeException("PetType not found with id " + request.getPetTypeId()));

        // Pet 객체 설정
        Pet pet = new Pet();
        pet.setUserId(request.getUserId());
        pet.setDiseaseId(request.getDiseaseId());
        pet.setPetTypeId(request.getPetTypeId());

        pet.setUser(user);
        pet.setDisease(disease);
        pet.setPetType(petType);
        pet.setName(request.getName());
        pet.setAge(request.getAge());
        pet.setGender(request.getGender());
        pet.setNeuteringYn(request.getNeuteringYn());
        pet.setAnimalNumber(request.getAnimalNumber());
        pet.setWeight(request.getWeight());
        pet.setSurgery(request.getSurgery());

        // Pet 저장
        pet = petRepository.save(pet);

        // PetResponseDto 반환
        return convertToPetResponseDto(pet);
    }

    // 등록페이지 - 반려동물 조회
    @Transactional
    public PetResponseDto getPet(Long userId, Long diseaseId, Long petTypeId) {
        // 복합키로 Pet 조회
        Pet pet = petRepository.findByUserIdAndDiseaseIdAndPetTypeId(userId, diseaseId, petTypeId)
                .orElseThrow(() -> new RuntimeException("Pet not found with userId " + userId + ", diseaseId " + diseaseId + ", and petTypeId " + petTypeId));

        // PetResponseDto 반환
        return convertToPetResponseDto(pet);
    }

    // 등록페이지 - 반려동물 수정
    @Transactional
    public PetResponseDto updatePet(Long userId, Long diseaseId, Long petTypeId, PetRequestDto request) {
        // 기존 Pet을 복합키로 조회
        Pet pet = petRepository.findByUserIdAndDiseaseIdAndPetTypeId(userId, diseaseId, petTypeId)
                .orElseThrow(() -> new RuntimeException("Pet not found with userId " + userId + ", diseaseId " + diseaseId + ", and petTypeId " + petTypeId));

        // 수정할 값 설정
        pet.setName(request.getName());
        pet.setAge(request.getAge());
        pet.setGender(request.getGender());
        pet.setNeuteringYn(request.getNeuteringYn());
        pet.setAnimalNumber(request.getAnimalNumber());
        pet.setWeight(request.getWeight());
        pet.setSurgery(request.getSurgery());

        // 연관된 엔티티 업데이트
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + request.getUserId()));
        Disease disease = diseaseRepository.findById(request.getDiseaseId())
                .orElseThrow(() -> new RuntimeException("Disease not found with id " + request.getDiseaseId()));
        PetType petType = petTypeRepository.findById(request.getPetTypeId())
                .orElseThrow(() -> new RuntimeException("PetType not found with id " + request.getPetTypeId()));

        pet.setUser(user);
        pet.setDisease(disease);
        pet.setPetType(petType);

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

    // Pet -> PetResponseDto 변환 메서드
    private PetResponseDto convertToPetResponseDto(Pet pet) {
        return PetResponseDto.builder()
                .userId(pet.getUser().getId())
                .userName(pet.getUser().getNickname())
                .diseaseId(pet.getDisease().getDiseaseId())
                .diseaseName(pet.getDisease().getDiseaseName())
                .petTypeId(pet.getPetType().getPetTypeId())
                .petTypeName(pet.getPetType().getPetTypeName())
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
