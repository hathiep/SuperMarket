package com.rs.supermarket.service;

import com.rs.supermarket.model.Order;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface OrderService {

    Order save(Order order);
    List<Order> findAll();
    List<Order> findByCustomerIdAndTime(int id, String startDate, String endDate);
    List<Map<Integer, Integer>> getCustomerByRevenue(String startDate, String endDate);
    Optional<Order> findById(int id);
    void deleteById(int id);
}
