package org.example.server.repository;

import org.example.server.entities.Ns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NsRepository extends JpaRepository<Ns, Long> {
    List<Ns> findByDisease_diseaseIdAndPetType_petTypeId(Long diseaseId, Long petTypeId);
}
