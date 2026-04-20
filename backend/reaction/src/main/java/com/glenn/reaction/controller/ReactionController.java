package com.glenn.reaction.controller;

import com.glenn.reaction.entity.Reaction;
import com.glenn.reaction.service.ReactionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reactions")
public class ReactionController {

    private final ReactionService reactionService;

    public ReactionController(ReactionService reactionService) {
        this.reactionService = reactionService;
    }

    @GetMapping
    public List<Reaction> getAllReactions() {
        return reactionService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reaction> getReactionById(@PathVariable Long id) {
        return reactionService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Reaction> createReaction(@RequestBody Reaction reaction) {
        Reaction saved = reactionService.create(reaction);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reaction> updateReaction(@PathVariable Long id, @RequestBody Reaction reaction) {
        if (reactionService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Reaction updated = reactionService.update(id, reaction);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReaction(@PathVariable Long id) {
        if (reactionService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        reactionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
