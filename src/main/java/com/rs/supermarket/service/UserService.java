package com.rs.supermarket.service;

import com.rs.supermarket.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findByKeyword (String keyword);
    List<User> findAllByRole (Integer role);
    Optional<User> findById(int id);
    Optional<User> findUserByEnP(String email, String password);
    User save(User user);
    void deleteById(int id);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
}
