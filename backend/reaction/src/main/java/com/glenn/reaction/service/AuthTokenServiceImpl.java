package com.glenn.reaction.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthTokenServiceImpl implements AuthTokenService {

    private final Map<String, Long> tokenStore = new ConcurrentHashMap<>();

    @Override
    public String createToken(Long userId) {
        String token = UUID.randomUUID().toString();
        tokenStore.put(token, userId);
        return token;
    }

    @Override
    public Optional<Long> findUserIdByToken(String token) {
        return Optional.ofNullable(tokenStore.get(token));
    }
}
