package com.rs.supermarket.controller;

import com.rs.supermarket.model.Order;
import com.rs.supermarket.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/statistic")
    public List<Map<Integer, Integer>> getCustomerByRevenue(@RequestParam("year") int year, @RequestParam("month") int month){
        return orderService.getCustomerByRevenue(year, month);
    }

    @GetMapping("/statistic_detail")
    public List<Order> findOrderByCustomerIdAndTime(@RequestParam("customer_id") int customer_id, @RequestParam("year") int year, @RequestParam("month") int month){
        return orderService.findByCustomerIdAndTime(customer_id, year, month);
    }

    @GetMapping("/order")
    public Order findById(@RequestParam (name="id") int id){
        return (Order) orderService.findById(id).orElse(null);
    }
}
