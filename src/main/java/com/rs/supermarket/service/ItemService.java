package com.rs.supermarket.service;

import com.rs.supermarket.model.Item;

import java.util.List;
import java.util.Optional;

public interface ItemService {
    List<Item> findByOrderId(int order_id);
    Item save(Item item);
    List<Item> findAll();
    Optional<Item> findById(int id);
    void saveAll(List<Item> items);
}
