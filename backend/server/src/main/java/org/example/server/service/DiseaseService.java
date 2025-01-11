package org.example.server.service;

import org.example.server.dto.DiseaseResponseDto;
import org.example.server.entities.Disease;
import org.example.server.repository.DiseaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiseaseService {

    private final DiseaseRepository DiseaseRepository;

    public DiseaseService(DiseaseRepository DiseaseRepository) {
        this.DiseaseRepository = DiseaseRepository;
    }

    // 질병 리스트
    public List<DiseaseResponseDto> getAllDiseases() {
        List<Disease> Disease = DiseaseRepository.findAll();
        return Disease.stream()
                .map(disease -> DiseaseResponseDto.builder()
                        .id(disease.getDiseaseId())
                        .name(disease.getDiseaseName())
                        .build())
                .collect(Collectors.toList());
    }
}