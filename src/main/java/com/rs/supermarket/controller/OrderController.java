package com.rs.supermarket.controller;

import com.rs.supermarket.model.Order;
import com.rs.supermarket.model.Product;
import com.rs.supermarket.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public List<Map<Integer, Integer>> getCustomerByRevenue(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){
        return orderService.getCustomerByRevenue(startDate, endDate);
    }

    @GetMapping("/statistic_detail")
    public List<Order> findOrderByCustomerIdAndTime(@RequestParam("customer_id") int customer_id, @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){
        return orderService.findByCustomerIdAndTime(customer_id, startDate, endDate);
    }

    @GetMapping("/order")
    public Order findById(@RequestParam (name="id") int id){
        return (Order) orderService.findById(id).orElse(null);
    }

    @PostMapping("/order/create")
    public Order create(@RequestBody Order order){
        return orderService.save(order);
    }

}
