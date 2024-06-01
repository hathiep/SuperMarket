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
    public List<User> findAllByRole(Integer role){
        return userRepository.findAllByRole(role);
    }

    @Override
    public Optional<User> findById(int id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByPhone(String phone){
        return userRepository.findByPhone(phone);
    }


    @Override
    public List<User> findByKeyword(String keyword){
        return userRepository.findByKeyword(keyword);
    }

    @Override
    public Optional<User> findUserByEnP(String email, String password) {
        return Optional.ofNullable(userRepository.findByEnP(email, password).orElse(null));
    }
    @Override
    public User save(User user) {
        return userRepository.save(user);
    }
    @Override
    public void deleteById(int id) {
        Optional<User> user = userRepository.findById(id);
        user.get().setRole(2);
        userRepository.save(user.get());
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByPhone(String phone) {
        return userRepository.existsByPhone(phone);
    }

}
