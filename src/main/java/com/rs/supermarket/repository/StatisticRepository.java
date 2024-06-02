package com.rs.supermarket.repository;

import com.rs.supermarket.model.Order;
import com.rs.supermarket.model.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface StatisticRepository extends JpaRepository<Statistic, Integer> {
    @Query(value = "SELECT " +
            "c.id AS id, " +  // Use c.id as the actual user id
            "o.customer_id, " +
            "c.name, " +
            "c.dob, " +
            "c.gender, " +
            "c.address, " +
            "c.email, " +
            "c.phone, " +
            "c.password, " +
            "c.role, " +
            "SUM(i.price * i.quantity) AS total_revenue " +
            "FROM item i " +
            "JOIN orders o ON i.order_id = o.id " +
            "JOIN user c ON o.customer_id = c.id " +
            "WHERE ((:startDate = '0' AND :endDate = '0') " +
            "OR (:startDate = '0' AND o.date <= IF(:endDate = '0', CURDATE(), LAST_DAY(DATE_FORMAT(CONCAT(:endDate, '-01'), '%Y-%m-%d')))) " +
            "OR (:endDate = '0' AND o.date >= DATE_FORMAT(CONCAT(:startDate, '-01'), '%Y-%m-%d')) " +
            "OR (o.date BETWEEN DATE_FORMAT(CONCAT(:startDate, '-01'), '%Y-%m-%d') " +
            "AND LAST_DAY(IF(:endDate = '0', CURDATE(), DATE_FORMAT(CONCAT(:endDate, '-01'), '%Y-%m-%d'))))) " +
            "GROUP BY o.customer_id " +
            "HAVING SUM(i.price * i.quantity) > 0",
            nativeQuery = true)
    List<Statistic> getAllByTime(String startDate, String endDate);



}
