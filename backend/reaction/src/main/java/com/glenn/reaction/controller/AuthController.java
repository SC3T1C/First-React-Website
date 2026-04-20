package com.glenn.reaction.controller;

import com.glenn.reaction.entity.User;
import com.glenn.reaction.service.AuthTokenService;
import com.glenn.reaction.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;
    private final AuthTokenService authTokenService;

    public AuthController(UserService userService, AuthTokenService authTokenService) {
        this.userService = userService;
        this.authTokenService = authTokenService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest request) {
        Optional<User> existing = userService.findByEmail(request.getEmail());
        if (existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        User user = new User(request.getEmail(), request.getPassword(), request.getFullName());
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());
        User saved = userService.create(user);
        String token = authTokenService.createToken(saved.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(token, saved));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return userService.authenticate(request.getEmail(), request.getPassword())
                .map(user -> {
                    String token = authTokenService.createToken(user.getId());
                    return ResponseEntity.ok(new AuthResponse(token, user));
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @GetMapping("/secure")
    public ResponseEntity<SecureResponse> secure(@RequestHeader(name = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authHeader.substring(7);
        Optional<Long> userId = authTokenService.findUserIdByToken(token);
        Optional<User> user = userId.flatMap(userService::findById);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(new SecureResponse("Secure route access granted.", new UserResponse(user.get())));
    }

    public static class SignupRequest {
        private String email;
        private String password;
        private String fullName;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }
    }

    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class AuthResponse {
        private String token;
        private UserResponse user;

        public AuthResponse(String token, User user) {
            this.token = token;
            this.user = new UserResponse(user);
        }

        public String getToken() {
            return token;
        }

        public UserResponse getUser() {
            return user;
        }
    }

    public static class SecureResponse {
        private String message;
        private UserResponse user;

        public SecureResponse(String message, UserResponse user) {
            this.message = message;
            this.user = user;
        }

        public String getMessage() {
            return message;
        }

        public UserResponse getUser() {
            return user;
        }
    }

    public static class UserResponse {
        private Long id;
        private String email;
        private String fullName;
        private boolean active;
        private LocalDateTime createdAt;

        public UserResponse(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.fullName = user.getFullName();
            this.active = user.isActive();
            this.createdAt = user.getCreatedAt();
        }

        public Long getId() {
            return id;
        }

        public String getEmail() {
            return email;
        }

        public String getFullName() {
            return fullName;
        }

        public boolean isActive() {
            return active;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }
    }
}
