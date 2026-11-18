package org.example.service;

import org.example.model.Swipe;
import org.example.model.User;
import org.example.repository.SwipeRepository;
import org.example.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SwipeService {

    private final UserRepository userRepo;
    private final SwipeRepository swipeRepo;

    public SwipeService(UserRepository userRepo, SwipeRepository swipeRepo) {
        this.userRepo = userRepo;
        this.swipeRepo = swipeRepo;
    }

    public List<User> getFeed(Long userId) {
        List<Long> alreadySwiped = new java.util.ArrayList<>(swipeRepo.findSwipedIdsBySwiperId(userId));
        alreadySwiped.add(userId); // exclude self
        return userRepo.findAll().stream()
                .filter(u -> !alreadySwiped.contains(u.getId()))
                .toList();
    }

    public boolean swipe(Long swiperId, Long swipedId, boolean liked) {
        swipeRepo.save(new Swipe(swiperId, swipedId, liked));
        if (!liked) return false;
        // check if swipedId has already liked swiperId back
        return swipeRepo.existsBySwipedIdAndSwiperIdAndLiked(swiperId, swipedId, true);
    }

    public List<User> getMatches(Long userId) {
        List<Long> matchIds = swipeRepo.findMutualMatchIds(userId);
        return userRepo.findAllById(matchIds);
    }
}
