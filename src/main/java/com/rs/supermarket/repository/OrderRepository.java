package com.rs.supermarket.repository;

import com.rs.supermarket.model.Order;
import com.rs.supermarket.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface OrderRepository extends JpaRepository<Order, Integer> {

//    @Query(value = "SELECT customer_id, SUM(total_cost) AS total_revenue FROM orders WHERE ((:month = 0 AND :year = 0) OR (:month = 0 AND EXTRACT(YEAR FROM date) = :year) OR (EXTRACT(MONTH FROM date) = :month AND :year = 0) OR (EXTRACT(MONTH FROM date) = :month AND EXTRACT(YEAR FROM date) = :year)) GROUP BY customer_id", nativeQuery = true)
    @Query(value = "SELECT o.customer_id, SUM(i.price * i.quantity) AS total_revenue " +
            "FROM item i " +
            "JOIN orders o ON i.order_id = o.id " +
            "WHERE (:startDate = '0' OR o.date >= DATE_FORMAT(CONCAT(:startDate, '-01'), '%Y-%m-%d')) " +
            "AND (:endDate = '0' OR o.date <= LAST_DAY(DATE_FORMAT(CONCAT(:endDate, '-01'), '%Y-%m-%d'))) " +
            "GROUP BY o.customer_id",
            nativeQuery = true)
    List<Map<Integer, Integer>> getCustomerByRevenue(String startDate, String endDate);

    @Query(value = "SELECT * FROM orders " +
            "WHERE ((:startDate = '0' AND :endDate = '0') " +
            "OR (:startDate = '0' AND DATE_FORMAT(date, '%Y') = DATE_FORMAT(:endDate, '%Y')) " +
            "OR (DATE_FORMAT(date, '%Y-%m') = DATE_FORMAT(:startDate, '%Y-%m') AND :endDate = '0') " +
            "OR (DATE_FORMAT(date, '%Y-%m') >= DATE_FORMAT(:startDate, '%Y-%m') " +
            "AND DATE_FORMAT(date, '%Y-%m') <= DATE_FORMAT(:endDate, '%Y-%m'))) " +
            "AND customer_id = :customer_id",
            nativeQuery = true)
    List<Order> findOrderByCustomerIdAndTime(int customer_id, String startDate, String endDate);


}
