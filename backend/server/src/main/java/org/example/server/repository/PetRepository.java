package org.example.server.repository;

import org.example.server.entities.Pet;
import org.example.server.entities.PetId; // 복합키 클래스
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<Pet, PetId> {

}