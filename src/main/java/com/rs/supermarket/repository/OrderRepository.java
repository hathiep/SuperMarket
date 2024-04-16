package com.rs.supermarket.repository;

import com.rs.supermarket.model.Order;
import com.rs.supermarket.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query(value = "SELECT customer_id, SUM(total_cost) AS total_revenue FROM orders WHERE ((:month = 0 AND :year = 0) OR (:month = 0 AND EXTRACT(YEAR FROM date) = :year) OR (EXTRACT(MONTH FROM date) = :month AND :year = 0) OR (EXTRACT(MONTH FROM date) = :month AND EXTRACT(YEAR FROM date) = :year)) GROUP BY customer_id", nativeQuery = true)
    List<Map<Integer, Integer>> getCustomerByRevenue(int year, int month);

    @Query(value = "SELECT * FROM orders WHERE ((:month = 0 AND :year = 0) OR (:month = 0 AND EXTRACT(YEAR FROM date) = :year) OR (EXTRACT(MONTH FROM date) = :month AND :year = 0) OR (EXTRACT(MONTH FROM date) = :month AND EXTRACT(YEAR FROM date) = :year)) AND customer_id = :customer_id", nativeQuery = true)
    List<Order> findOrderByCustomerIdAndTime(int customer_id, int year, int month);

}
