package org.example.server.repository;

import org.example.server.entities.Pet;
import org.example.server.entities.PetId; // 복합키 클래스
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PetRepository extends JpaRepository<Pet, PetId> {
    // 복합키로 조회
    Optional<Pet> findByUserIdAndDiseaseIdAndPetTypeId(Long userId, Long diseaseId, Long petTypeId);
    List<Pet> findByUserId(Long userId);
}