package com.rs.supermarket.service;

import com.rs.supermarket.model.User;

public interface UserService {
    User findUserByEnP(String email, String password);
    User save(User user);
    boolean existsByEmail(String email);
}
