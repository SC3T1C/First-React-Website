package com.glenn.reaction.service;

import com.glenn.reaction.entity.Reaction;
import java.util.List;
import java.util.Optional;

public interface ReactionService {

    List<Reaction> findAll();

    Optional<Reaction> findById(Long id);

    Reaction create(Reaction reaction);

    Reaction update(Long id, Reaction reaction);

    void delete(Long id);
}
