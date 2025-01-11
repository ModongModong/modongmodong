package org.example.server.service;

import org.example.server.dto.NsResponseDto;
import org.example.server.entities.Ns;
import org.example.server.entities.Pet;
import org.example.server.repository.NsRepository;
import org.example.server.repository.PetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class NsService {

    private final PetRepository petRepository;
    private final NsRepository nsRepository;

    public NsService(PetRepository petRepository, NsRepository nsRepository) {
        this.petRepository = petRepository;
        this.nsRepository = nsRepository;
    }

    public List<NsResponseDto> getNs(Long userId) {
        // 1. userPk에 해당하는 반려동물 조회
        List<Pet> pets = petRepository.findByUserId(userId);

        // 2. 반려동물이 없으면 빈 리스트 반환
        if (pets.isEmpty()) {
            return List.of();
        }

        // 3. 반려동물의 diseaseId와 typeId로 영양제 조회 및 DTO 생성
        return pets.stream()
                .map(pet -> {
                    // pet에서 diseaseId와 petTypeId 가져오기
                    Long diseaseId = pet.getDiseaseId();
                    Long petTypeId = pet.getPetTypeId();

                    // ID로 영양제 리스트 조회
                    List<Ns> nsList = nsRepository.findByDisease_diseaseIdAndPetType_petTypeId(diseaseId, petTypeId);

                    // 만약 영양제 리스트가 비어 있으면 null 처리
                    if (nsList.isEmpty()) {
                        return null;
                    }

                    // 첫 번째 영양제 선택
                    Ns ns = nsList.get(0);

                    // NsResponseDto 생성
                    return NsResponseDto.builder()
                            .userId(pet.getUserId())
                            .petId(pet.getPetId())
                            .petName(pet.getName())
                            .nsId(ns.getId())
                            .nsName(ns.getName())
                            .nsPrice(ns.getPrice())
                            .nsEx(ns.getExplanation())
                            .build();
                })
                .filter(Objects::nonNull)  // null 필터링 (빈 리스트일 경우)
                .collect(Collectors.toList());
    }
}
