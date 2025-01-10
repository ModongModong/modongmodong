package org.example.server.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Pet_Type")
@Getter
@Setter
@NoArgsConstructor
public class PetType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_pk")
    private Long petTypeId;

    @Column(name = "pet_type_name", length = 20)
    private String petTypeName;
}
