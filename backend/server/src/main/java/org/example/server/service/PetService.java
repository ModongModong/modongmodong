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

    // 반려동물 추가
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
        return PetResponseDto.builder()
                .userId(pet.getUser().getId())
                .diseaseId(pet.getDisease().getDiseaseId())
                .petTypeId(pet.getPetType().getPetTypeId())
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
