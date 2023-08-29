package com.gp.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity // from JPA: treat this class as a persistence entity that can be store,retri from databaswe
@Table(name="product") // from JPA: specify mapping between this entity and the table database
@Data // @Data from lombok will generate getter and setter behind the scence
public class Product {
    @Id // primary key of an entity
    @GeneratedValue(strategy = GenerationType.IDENTITY) // JPA will auto generate id
    @Column(name="id")
    private Long id;

    @ManyToOne // many product can have the same category
    @JoinColumn(name = "category_id", nullable = false) // relationship between two entity
    private ProductCategory category;

    @Column(name="sku")
    private String sku;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="unit_price")
    private BigDecimal unitPrice;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="active")
    private boolean active;

    @Column(name="units_in_stock")
    private int unitsInStock;

    @Column(name="date_created")
    @CreationTimestamp // hibernate automatically manage the timestamps
    private Date dateCreated;

    @Column(name="last_updated")
    @UpdateTimestamp
    private Date lastUpdated;

}
