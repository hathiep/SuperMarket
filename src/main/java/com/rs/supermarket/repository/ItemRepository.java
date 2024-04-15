package com.rs.supermarket.repository;

import com.rs.supermarket.model.Item;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    @Query(value = "SELECT * FROM item i WHERE i.order_id = :order_id ", nativeQuery = true)
    List<Item> searchItem(@Param("order_id") Integer order_id);
}
