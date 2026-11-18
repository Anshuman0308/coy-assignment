package org.example.controller;

import org.example.model.User;
import org.example.service.SwipeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AppController {

    private final SwipeService swipeService;
    // Demo: logged-in user is always ID 1
    private static final Long CURRENT_USER = 1L;

    public AppController(SwipeService swipeService) {
        this.swipeService = swipeService;
    }

    @GetMapping("/feed")
    public List<User> getFeed() {
        return swipeService.getFeed(CURRENT_USER);
    }

    @PostMapping("/swipe")
    public Map<String, Object> swipe(@RequestBody Map<String, Object> body) {
        Long swipedId = Long.valueOf(body.get("swipedId").toString());
        boolean liked = Boolean.parseBoolean(body.get("liked").toString());
        boolean isMatch = swipeService.swipe(CURRENT_USER, swipedId, liked);
        return Map.of("match", isMatch);
    }

    @GetMapping("/matches")
    public List<User> getMatches() {
        return swipeService.getMatches(CURRENT_USER);
    }
}
