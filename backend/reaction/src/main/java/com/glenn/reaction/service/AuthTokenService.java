package com.glenn.reaction.service;

import java.util.Optional;

public interface AuthTokenService {

    String createToken(Long userId);

    Optional<Long> findUserIdByToken(String token);
}
