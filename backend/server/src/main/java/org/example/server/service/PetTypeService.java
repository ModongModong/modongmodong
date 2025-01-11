package org.example.server.service;

import org.example.server.dto.PetTypeResponseDto;
import org.example.server.entities.PetType;
import org.example.server.repository.PetTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetTypeService {

    private final PetTypeRepository petTypeRepository;

    public PetTypeService(PetTypeRepository petTypeRepository) {
        this.petTypeRepository = petTypeRepository;
    }

    // 품종 리스트
    public List<PetTypeResponseDto> getAllPetTypes() {
        List<PetType> petTypes = petTypeRepository.findAll();
        return petTypes.stream()
                .map(petType -> PetTypeResponseDto.builder()
                        .id(petType.getPetTypeId())
                        .name(petType.getPetTypeName())
                        .build())
                .collect(Collectors.toList());
    }
}