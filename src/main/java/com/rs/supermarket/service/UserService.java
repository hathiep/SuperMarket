package com.rs.supermarket.service;

import com.rs.supermarket.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findByKeyword (String keyword);
    List<User> findAll();
    Optional<User> findById(int id);
    User findUserByEnP(String email, String password);
    User save(User user);

    User searchUsers(String keyword);

    void deleteById(int id);
    boolean existsByEmail(String email);
}
