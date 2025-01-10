package org.example.server.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Disease")
@Getter
@Setter
@NoArgsConstructor
public class Disease {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "disease_pk")
    private Long diseaseId;

    @Column(name = "pet_disease__name", length = 20)
    private String diseaseName;
}
