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
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pet_pk")
    private Long petId;

    // 외래키 필드
    @Column(name = "user_pk", nullable = false, insertable = false, updatable = false)
    private Long userId;

    @Column(name = "disease_pk", nullable = false, insertable = false, updatable = false)
    private Long diseaseId;

    @Column(name = "type_pk", nullable = false, insertable = false, updatable = false)
    private Long petTypeId;

    // 연관 관계 매핑
    @ManyToOne
    @JoinColumn(name = "user_pk", referencedColumnName = "user_pk")
    private User user;

    @ManyToOne
    @JoinColumn(name = "disease_pk", referencedColumnName = "disease_pk")
    private Disease disease;

    @ManyToOne
    @JoinColumn(name = "type_pk", referencedColumnName = "type_pk")
    private PetType petType;

    // 일반 컬럼
    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "age")
    private Integer age;

    @Column(name = "gender", length = 1)
    private String gender;

    @Column(name = "neutering_yn", length = 1)
    private String neuteuringYn;

    @Column(name = "animal_number")
    private Integer animalNumber;

    @Column(name = "weight")
    private Float weight;

    @Column(name = "surgery", length = 20)
    private String surgery;
}