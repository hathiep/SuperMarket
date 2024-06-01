package com.rs.supermarket.repository;

import com.rs.supermarket.model.Product;
import com.rs.supermarket.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value = "SELECT * FROM user u WHERE" +
            " u.email =:email AND "+
            " u.password = :password", nativeQuery = true)
    Optional<User> findByEnP(@Param("email") String email, @Param("password") String password);

    @Query(value = "SELECT * FROM user u WHERE u.name LIKE %:keyword% AND u.role = 0", nativeQuery = true)
    List<User> findByKeyword(@Param("keyword") String keyword);

    List<User> findAllByRole(@Param("role") Integer role);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);

    @Query(value = "SELECT * FROM user WHERE name LIKE %:keyword%", nativeQuery = true)
    List<Product> searchUsersByRole(@Param("keyword") String keyword);

    Optional<User> findByEmail(@Param("email") String email);
    Optional<User> findByPhone(@Param("phone") String phone);

}
