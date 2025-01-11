package org.example.server.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Nutritional_Supplement")
public class Ns {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ns_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "disease_pk", referencedColumnName = "disease_pk", nullable = false)
    private Disease disease;

    @ManyToOne
    @JoinColumn(name = "type_name", referencedColumnName = "type_pk", nullable = false)
    private PetType petType;

    @Column(name = "ns_name")
    private String name;

    @Column(name = "ns_price")
    private Integer price;

    @Column(name = "ns_ex")
    private String explanation;

}