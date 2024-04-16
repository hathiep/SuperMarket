package com.rs.supermarket.service.impl;

import com.rs.supermarket.model.User;
import com.rs.supermarket.repository.UserRepository;
import com.rs.supermarket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository  userRepository;

    @Override
    public List<User> findAll(){
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(int id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> findByKeyword(String keyword){
        return userRepository.findByKeyword(keyword);
    }

    @Override
    public User findUserByEnP(String email, String password) {
        return userRepository.findByEnP(email,password);
    }
    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User searchUsers(String keyword) {
        return (User) userRepository.searchUsers(keyword);
    }

    @Override
    public void deleteById(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

}
