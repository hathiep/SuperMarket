package com.rs.supermarket.repository;

import com.rs.supermarket.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value = "SELECT * FROM user u WHERE" +
            " u.email LIKE %:email% AND "+
            " u.password LIKE %:password%", nativeQuery = true)
    User findByEnP(@Param("email") String email,@Param("password") String password);

    boolean existsByEmail(String email);

}
