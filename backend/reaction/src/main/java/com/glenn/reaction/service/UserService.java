package com.glenn.reaction.service;

import com.glenn.reaction.entity.User;

import java.util.Optional;

public interface UserService {

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    User create(User user);

    Optional<User> authenticate(String email, String password);
}
