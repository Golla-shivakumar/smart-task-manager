package com.nani.taskmanager
        .controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans
        .factory.annotation.Autowired;

import org.springframework
        .security.crypto.bcrypt
        .BCryptPasswordEncoder;

import org.springframework.web
        .bind.annotation.*;

import com.nani.taskmanager
        .entity.User;

import com.nani.taskmanager
        .repository.UserRepository;

import com.nani.taskmanager
        .security.JwtService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository
            userRepository;

    @Autowired
    private JwtService jwtService;

    private BCryptPasswordEncoder
            encoder =
            new BCryptPasswordEncoder();

    @PostMapping("/register")
    public User register(
            @RequestBody User user
    ) {

        user.setPassword(
                encoder.encode(
                        user.getPassword()
                )
        );

        return userRepository.save(
                user
        );
    }

    @PostMapping("/login")
    public Map<String, String>
    login(
            @RequestBody User user
    ) {

        User existingUser =
                userRepository
                        .findByEmail(
                                user.getEmail()
                        )
                        .orElseThrow();

        if (!encoder.matches(
                user.getPassword(),
                existingUser.getPassword()
        )) {

            throw new RuntimeException(
                    "Invalid credentials"
            );
        }

        String token =
                jwtService.generateToken(
                        user.getEmail()
                );

        Map<String, String>
                response = new HashMap<>();

        response.put(
                "token",
                token
        );

        return response;
    }
}