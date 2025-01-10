package org.example.server.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Pet")
@Getter
@Setter
@NoArgsConstructor
@IdClass(PetId.class)  // 복합 키 클래스
public class Pet {

    // 복합키 필드
    @Id
    @Column(name = "user_pk")
    private Long userId;

    @Id
    @Column(name = "disease_pk")
    private Long diseaseId;

    @Id
    @Column(name = "type_pk")
    private Long petTypeId;

    // 연관 관계 매핑
    @ManyToOne
    @JoinColumn(name = "user_pk", insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "disease_pk", insertable = false, updatable = false)
    private Disease disease;

    @ManyToOne
    @JoinColumn(name = "type_pk", insertable = false, updatable = false)
    private PetType petType;

    // 일반 컬럼
    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "age")
    private Integer age;

    @Column(name = "gender", length = 1)
    private String gender;

    @Column(name = "neutering_yn", length = 1)
    private String neuteringYn;

    @Column(name = "animal_number")
    private Integer animalNumber;

    @Column(name = "weight")
    private Float weight;

    @Column(name = "surgery", length = 20)
    private String surgery;
}
