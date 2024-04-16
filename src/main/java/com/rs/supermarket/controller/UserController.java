package com.rs.supermarket.controller;

import com.rs.supermarket.model.Product;
import com.rs.supermarket.model.User;
import com.rs.supermarket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        return userService.findUserByEnP(user.getEmail(), user.getPassword());
    }
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        // Kiểm tra xem email đã tồn tại trong hệ thống chưa
        if (userService.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email đã được sử dụng. Vui lòng chọn email khác!");
        }

        return userService.save(user);
    }

    @PostMapping("/add_customer")
    public User add_customer(@RequestBody User user) {
        // Kiểm tra xem email đã tồn tại trong hệ thống chưa
        if (userService.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email đã được sử dụng. Vui lòng chọn email khác!");
        }

        return userService.save(user);
    }
    @PutMapping("/edit_customer")
    public User edit_customer(@RequestBody User user) {
        return userService.save(user);
    }

    @DeleteMapping("/delete_customer")
    public void delete(@RequestParam(name="id") int id){
        userService.deleteById(id);
    }

    @GetMapping("/get_all_user")
    public List<User> get_AllUser(){
        return userService.findAll();
    }

    @GetMapping("/user")
    public User findById(@RequestParam ("user_id") Integer user_id){
        return (User) userService.findById(user_id).orElse(null);
    }

    @GetMapping("/user/search")
    public List<User> searchUsers(@RequestParam("keyword") String keyword){
        return userService.findByKeyword(keyword);
    }
}
