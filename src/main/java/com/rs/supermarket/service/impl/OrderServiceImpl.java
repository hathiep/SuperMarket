package com.rs.supermarket.service.impl;

import com.rs.supermarket.model.Order;
import com.rs.supermarket.model.Product;
import com.rs.supermarket.repository.OrderRepository;
import com.rs.supermarket.service.OrderService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    private OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Order save(Order order) {
//        LocalDate now = LocalDate.now();
//        order.setDate(now);
        return orderRepository.save(order);
    }

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> findByCustomerIdAndTime(int customer_id, String startDate, String endDate){
        return orderRepository.findOrderByCustomerIdAndTime(customer_id, startDate, endDate);
    }

    @Override
    public List<Map<Integer, Integer>> getCustomerByRevenue(String startDate, String endDate) {
        return orderRepository.getCustomerByRevenue(startDate, endDate);
    }

    @Override
    public Optional<Order> findById(int id) {
        return orderRepository.findById(id);
    }

    @Override
    public void deleteById(int id) {
        orderRepository.deleteById(id);
    }
}
