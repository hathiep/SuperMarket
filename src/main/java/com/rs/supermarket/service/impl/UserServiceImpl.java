package com.rs.supermarket.service.impl;

import com.rs.supermarket.model.User;
import com.rs.supermarket.repository.UserRepository;
import com.rs.supermarket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository  userRepository;

    @Override
    public User findUserByEnP(String email, String password) {
        return userRepository.findByEnP(email,password);
    }
    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

}
