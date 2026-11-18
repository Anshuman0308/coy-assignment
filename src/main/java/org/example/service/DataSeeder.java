package org.example.service;

import org.example.model.Swipe;
import org.example.model.User;
import org.example.repository.SwipeRepository;
import org.example.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepo;
    private final SwipeRepository swipeRepo;

    public DataSeeder(UserRepository userRepo, SwipeRepository swipeRepo) {
        this.userRepo = userRepo;
        this.swipeRepo = swipeRepo;
    }

    @Override
    public void run(String... args) {
        // User 1 is the logged-in demo user
        userRepo.save(new User("Alex (You)", 25, "https://i.pravatar.cc/300?img=1",
                "Coffee addict, hiking enthusiast.", "New York", "Hiking, Coffee, Travel"));

        List<Object[]> profiles = List.of(
            new Object[]{"Emma", 23, 5, "Bookworm and yoga lover.", "Boston", "Reading, Yoga, Art"},
            new Object[]{"Sophia", 26, 9, "Foodie exploring every cuisine.", "Chicago", "Food, Travel, Music"},
            new Object[]{"Olivia", 24, 10, "Photographer chasing golden hour.", "Los Angeles", "Photography, Hiking, Film"},
            new Object[]{"Isabella", 27, 11, "Dog mom and marathon runner.", "Seattle", "Running, Dogs, Cooking"},
            new Object[]{"Mia", 22, 12, "Aspiring chef and wine enthusiast.", "San Francisco", "Cooking, Wine, Travel"},
            new Object[]{"Charlotte", 25, 13, "Tech nerd who loves board games.", "Austin", "Gaming, Tech, Coffee"},
            new Object[]{"Amelia", 28, 14, "Surfer and marine biologist.", "Miami", "Surfing, Ocean, Science"},
            new Object[]{"Harper", 23, 15, "Jazz musician and coffee shop regular.", "Nashville", "Music, Coffee, Art"},
            new Object[]{"Evelyn", 26, 16, "Startup founder, weekend hiker.", "Denver", "Entrepreneurship, Hiking, Yoga"},
            new Object[]{"Abigail", 24, 17, "Avid reader and cat person.", "Portland", "Books, Cats, Cycling"},
            new Object[]{"Emily", 27, 18, "Dancer and travel blogger.", "New York", "Dance, Travel, Writing"},
            new Object[]{"Elizabeth", 25, 19, "Architect with a love for design.", "Chicago", "Design, Art, Coffee"},
            new Object[]{"Sofia", 22, 20, "Gamer and anime fan.", "Los Angeles", "Gaming, Anime, Music"},
            new Object[]{"Avery", 29, 21, "Nurse who loves outdoor adventures.", "Phoenix", "Hiking, Camping, Fitness"},
            new Object[]{"Ella", 24, 22, "Poet and plant parent.", "Brooklyn", "Poetry, Plants, Yoga"},
            new Object[]{"Scarlett", 26, 23, "Film critic and pasta maker.", "Rome", "Cinema, Cooking, Travel"},
            new Object[]{"Grace", 23, 24, "Swimmer and environmental activist.", "San Diego", "Swimming, Environment, Music"},
            new Object[]{"Chloe", 27, 25, "Startup marketer and weekend painter.", "Boston", "Marketing, Painting, Coffee"},
            new Object[]{"Victoria", 25, 26, "History buff and museum hopper.", "Washington DC", "History, Art, Travel"},
            new Object[]{"Riley", 22, 27, "Fitness coach and smoothie lover.", "Atlanta", "Fitness, Nutrition, Hiking"},
            new Object[]{"Aria", 28, 28, "UX designer and board game collector.", "Seattle", "Design, Gaming, Coffee"},
            new Object[]{"Lily", 24, 29, "Veterinarian and animal rescuer.", "Denver", "Animals, Hiking, Photography"},
            new Object[]{"Zoey", 26, 30, "Stand-up comedian and improv actor.", "Chicago", "Comedy, Theater, Music"},
            new Object[]{"Penelope", 23, 31, "Cyclist and street food explorer.", "Austin", "Cycling, Food, Travel"},
            new Object[]{"Layla", 27, 32, "Marine photographer and diver.", "Hawaii", "Diving, Photography, Ocean"},
            new Object[]{"Nora", 25, 33, "Software engineer and rock climber.", "San Francisco", "Climbing, Tech, Coffee"},
            new Object[]{"Lillian", 24, 34, "Pastry chef and art gallery fan.", "Paris", "Baking, Art, Travel"},
            new Object[]{"Hannah", 26, 35, "Journalist and avid podcast listener.", "New York", "Writing, Podcasts, Yoga"},
            new Object[]{"Addison", 23, 36, "Graphic designer and vinyl collector.", "Portland", "Design, Music, Coffee"},
            new Object[]{"Aubrey", 28, 37, "Yoga instructor and travel junkie.", "Bali", "Yoga, Travel, Meditation"}
        );

        for (Object[] p : profiles) {
            userRepo.save(new User(
                (String) p[0], (int) p[1],
                "https://i.pravatar.cc/300?img=" + p[2],
                (String) p[3], (String) p[4], (String) p[5]
            ));
        }

        // Users 2-11 have already liked user 1 (so swiping right on them creates a match)
        for (long i = 2; i <= 11; i++) {
            swipeRepo.save(new Swipe(i, 1L, true));
        }
    }
}
