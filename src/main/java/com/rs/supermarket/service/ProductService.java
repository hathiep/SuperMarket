package com.rs.supermarket.service;

import com.rs.supermarket.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> findByKeyword(String keyword);
    Product findByName(String name);
    Product save(Product product);
    List<Product> findAll();
    List<Product> findByCategory(String keyword);
    Optional<Product> findById(int id);
    void deleteById(int id);

}
