package com.gp.ecommerce.dao;

import com.gp.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

// Repository contains Product entities with primary key type Long id
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

    // a query method that match category id use param id
    // behind the scence, spring will execute query similar to this
        // SELECT * FROM product where category_id=?
    // Spring Data REST auto expose endpoint based on this query method name
    // because method name start with findBy
    // test method with http://localhost:8080/api/products/search/findByCategoryId?id=1
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    // a query method bind String name to Param name
    // logic SELECT from Product p WHERE p.name LIKE CONCAT(%, :name. %name)
    // test the method with http://localhost:8080/api/products/search/findByNameContaining?name=Python
    Page<Product> findByNameContaining(@Param ("name") String name, Pageable pageable);
}
