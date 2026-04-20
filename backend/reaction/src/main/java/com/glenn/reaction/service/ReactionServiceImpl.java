package com.glenn.reaction.service;

import com.glenn.reaction.entity.Reaction;
import com.glenn.reaction.repository.ReactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReactionServiceImpl implements ReactionService {

    private final ReactionRepository reactionRepository;

    public ReactionServiceImpl(ReactionRepository reactionRepository) {
        this.reactionRepository = reactionRepository;
    }

    @Override
    public List<Reaction> findAll() {
        return reactionRepository.findAll();
    }

    @Override
    public Optional<Reaction> findById(Long id) {
        return reactionRepository.findById(id);
    }

    @Override
    public Reaction create(Reaction reaction) {
        return reactionRepository.save(reaction);
    }

    @Override
    public Reaction update(Long id, Reaction reaction) {
        return reactionRepository.findById(id)
                .map(existing -> {
                    existing.setName(reaction.getName());
                    existing.setDescription(reaction.getDescription());
                    existing.setActive(reaction.isActive());
                    return reactionRepository.save(existing);
                })
                .orElseGet(() -> {
                    reaction.setId(id);
                    return reactionRepository.save(reaction);
                });
    }

    @Override
    public void delete(Long id) {
        reactionRepository.deleteById(id);
    }
}
