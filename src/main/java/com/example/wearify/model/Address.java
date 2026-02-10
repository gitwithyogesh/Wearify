package com.example.wearify.model;

import com.example.wearify.model.enums.State;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String street;
    private String city;

    @Enumerated(EnumType.STRING)
    private State state;

    private String zipCode;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
