package org.example.server.entities;

import java.io.Serializable;
import java.util.Objects;

public class PetId implements Serializable {

    private Long userId;
    private Long diseaseId;
    private Long petTypeId;

    // 기본 생성자
    public PetId() {
    }

    // 생성자
    public PetId(Long userId, Long diseaseId, Long petTypeId) {
        this.userId = userId;
        this.diseaseId = diseaseId;
        this.petTypeId = petTypeId;
    }

    // 복합키 설정
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PetId petId = (PetId) o;
        return Objects.equals(userId, petId.userId) &&
                Objects.equals(diseaseId, petId.diseaseId) &&
                Objects.equals(petTypeId, petId.petTypeId);
    }


    // 해시값 비교
    @Override
    public int hashCode() {
        return Objects.hash(userId, diseaseId, petTypeId);
    }
}