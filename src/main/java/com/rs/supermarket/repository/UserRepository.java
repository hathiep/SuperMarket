package com.rs.supermarket.repository;

import com.rs.supermarket.model.Product;
import com.rs.supermarket.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value = "SELECT * FROM user u WHERE" +
            " u.email LIKE %:email% AND "+
            " u.password LIKE %:password%", nativeQuery = true)
    User findByEnP(@Param("email") String email,@Param("password") String password);

    @Query(value = "SELECT * FROM user u WHERE" +
            " u.name LIKE %:keyword%", nativeQuery = true)
    List<User> findByKeyword(@Param("keyword") String keyword);
    boolean existsByEmail(String email);

    @Query(value = "SELECT * FROM user WHERE name LIKE %:keyword%", nativeQuery = true)
    List<Product> searchUsers(@Param("keyword") String keyword);

}
