package com.rs.supermarket.controller;

import com.rs.supermarket.model.Product;
import com.rs.supermarket.model.User;
import com.rs.supermarket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        Optional<User> u = userService.findUserByEnP(user.getEmail(), user.getPassword());
        if(u.get() == null){
            throw new RuntimeException("Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại!");
        }
        if(u.get().getRole() == 2){
            throw new RuntimeException("Tài khoản của bạn đã bị khoá, vui lòng đăng nhập bằng tài khoản khác!");
        }
        return u.get();
    }
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        // Kiểm tra xem email đã tồn tại trong hệ thống chưa
        if (userService.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email đã được sử dụng. Vui lòng nhập email khác!");
        }
        return userService.save(user);
    }

    @PostMapping("/add_customer")
    public User add_customer(@RequestBody User user) {
        // Kiểm tra xem email đã tồn tại trong hệ thống chưa
        if (userService.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email đã được sử dụng. Vui lòng nhập email khác!");
        }
        if (userService.existsByPhone(user.getPhone())) {
            throw new RuntimeException("Số điện thoại đã được sử dụng. Vui lòng nhập số điện thoại khác!");
        }
        return userService.save(user);
    }
    @PutMapping("/edit_customer")
    public User edit_customer(@RequestBody User user) {
        if (userService.existsByPhone(user.getPhone())) {
            throw new RuntimeException("Số điện thoại đã được sử dụng. Vui lòng nhập số điện thoại khác!");
        }
        return userService.save(user);
    }

    @DeleteMapping("/delete_customer")
    public void delete(@RequestParam(name="id") int id){
        userService.deleteById(id);
    }

    @GetMapping("/get_all_user")
    public List<User> get_AllUser(){
        return userService.findAllByRole(0);
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
