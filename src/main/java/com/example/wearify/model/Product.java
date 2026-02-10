package com.example.wearify.model;

import com.example.wearify.model.enums.Category;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double price;

    @Enumerated(EnumType.STRING)
    private Category category;

    private String imageUrl;
    private Integer stock;
    private String brand;
}
