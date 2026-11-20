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
        // User 1 — logged-in demo user
        userRepo.save(new User("Alex", 25,
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
                "Coffee addict and weekend hiker. Always planning the next adventure.", "New York", "Hiking, Coffee, Travel"));

        List<Object[]> profiles = List.of(
            new Object[]{"Emma", 23,
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
                "Bookworm who can recommend a novel for every mood. Yoga at sunrise, wine at sunset.", "Boston", "Reading, Yoga, Art"},
            new Object[]{"Sophia", 26,
                "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop",
                "Foodie on a mission to try every cuisine on earth. Currently obsessed with ramen.", "Chicago", "Food, Travel, Music"},
            new Object[]{"Olivia", 24,
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop",
                "Photographer chasing golden hour. My camera goes everywhere with me.", "Los Angeles", "Photography, Hiking, Film"},
            new Object[]{"Isabella", 27,
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop",
                "Dog mom of two golden retrievers. Marathon runner and brunch enthusiast.", "Seattle", "Running, Dogs, Cooking"},
            new Object[]{"Mia", 22,
                "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop",
                "Culinary school grad. I'll cook for you on the second date.", "San Francisco", "Cooking, Wine, Travel"},
            new Object[]{"Charlotte", 25,
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop",
                "Software engineer by day, board game champion by night. Looking for my player 2.", "Austin", "Gaming, Tech, Coffee"},
            new Object[]{"Amelia", 28,
                "https://images.unsplash.com/photo-1502767089025-6572583495f9?w=400&h=500&fit=crop",
                "Marine biologist and surfer. The ocean is my happy place.", "Miami", "Surfing, Ocean, Science"},
            new Object[]{"Harper", 23,
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
                "Jazz pianist and coffee shop regular. I know all the hidden gems in this city.", "Nashville", "Music, Coffee, Art"},
            new Object[]{"Evelyn", 26,
                "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=500&fit=crop",
                "Startup founder who unwinds on mountain trails. Work hard, hike harder.", "Denver", "Entrepreneurship, Hiking, Yoga"},
            new Object[]{"Abigail", 24,
                "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=400&h=500&fit=crop",
                "Cat mom, avid reader, and amateur ceramicist. My apartment smells like books.", "Portland", "Books, Cats, Cycling"},
            new Object[]{"Emily", 27,
                "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&h=500&fit=crop",
                "Contemporary dancer and travel blogger. 30 countries and counting.", "New York", "Dance, Travel, Writing"},
            new Object[]{"Elizabeth", 25,
                "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop",
                "Architect obsessed with sustainable design. I sketch buildings on napkins.", "Chicago", "Design, Art, Coffee"},
            new Object[]{"Sofia", 22,
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
                "Gamer and anime fan. Don't challenge me to Mario Kart unless you're ready to lose.", "Los Angeles", "Gaming, Anime, Music"},
            new Object[]{"Avery", 29,
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop",
                "ER nurse who recharges in the wilderness. Camping trips are my therapy.", "Phoenix", "Hiking, Camping, Fitness"},
            new Object[]{"Ella", 24,
                "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop",
                "Poet and plant parent. My apartment is basically a jungle at this point.", "Brooklyn", "Poetry, Plants, Yoga"},
            new Object[]{"Scarlett", 26,
                "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=400&h=500&fit=crop",
                "Film critic and homemade pasta enthusiast. Let's debate Kubrick over dinner.", "Rome", "Cinema, Cooking, Travel"},
            new Object[]{"Grace", 23,
                "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop",
                "Competitive swimmer and environmental activist. The ocean needs us.", "San Diego", "Swimming, Environment, Music"},
            new Object[]{"Chloe", 27,
                "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=400&h=500&fit=crop",
                "Marketing strategist who paints on weekends. Creativity is my currency.", "Boston", "Marketing, Painting, Coffee"},
            new Object[]{"Victoria", 25,
                "https://images.unsplash.com/photo-1484399172022-72a90b12e3c1?w=400&h=500&fit=crop",
                "History PhD student and museum addict. I can make any era sound fascinating.", "Washington DC", "History, Art, Travel"},
            new Object[]{"Riley", 22,
                "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=400&h=500&fit=crop",
                "Personal trainer and smoothie inventor. I'll get you to love mornings.", "Atlanta", "Fitness, Nutrition, Hiking"},
            new Object[]{"Aria", 28,
                "https://images.unsplash.com/photo-1491349174775-aaaefdd81942?w=400&h=500&fit=crop",
                "UX designer who collects board games. I have 47. Yes, I've played them all.", "Seattle", "Design, Gaming, Coffee"},
            new Object[]{"Lily", 24,
                "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=500&fit=crop",
                "Veterinarian and animal rescuer. Currently fostering three kittens.", "Denver", "Animals, Hiking, Photography"},
            new Object[]{"Zoey", 26,
                "https://images.unsplash.com/photo-1514315384763-ba401779410f?w=400&h=500&fit=crop",
                "Stand-up comedian and improv actor. I promise I'm funnier in person.", "Chicago", "Comedy, Theater, Music"},
            new Object[]{"Penelope", 23,
                "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop",
                "Cyclist and street food explorer. I've eaten at 200+ food trucks.", "Austin", "Cycling, Food, Travel"},
            new Object[]{"Layla", 27,
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=500&fit=crop",
                "Underwater photographer and scuba diver. The deep sea is endlessly beautiful.", "Hawaii", "Diving, Photography, Ocean"},
            new Object[]{"Nora", 25,
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
                "Software engineer and rock climber. I debug code and scale walls for fun.", "San Francisco", "Climbing, Tech, Coffee"},
            new Object[]{"Lillian", 24,
                "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=400&h=500&fit=crop",
                "Pastry chef trained in Paris. I'll bring croissants on the first date.", "Paris", "Baking, Art, Travel"},
            new Object[]{"Hannah", 26,
                "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=400&h=500&fit=crop",
                "Investigative journalist and podcast host. I ask a lot of questions — it's a feature.", "New York", "Writing, Podcasts, Yoga"},
            new Object[]{"Addison", 23,
                "https://images.unsplash.com/photo-1502323703975-b9a4e5d70f87?w=400&h=500&fit=crop",
                "Graphic designer and vinyl record collector. My apartment has more records than furniture.", "Portland", "Design, Music, Coffee"},
            new Object[]{"Aubrey", 28,
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
                "Yoga instructor and digital nomad. Currently based in Bali, next stop unknown.", "Bali", "Yoga, Travel, Meditation"}
        );

        for (Object[] p : profiles) {
            userRepo.save(new User(
                (String) p[0], (int) p[1], (String) p[2],
                (String) p[3], (String) p[4], (String) p[5]
            ));
        }

        // Users 2–16 have already liked user 1 → instant matches when user swipes right on them
        for (long i = 2; i <= 16; i++) {
            swipeRepo.save(new Swipe(i, 1L, true));
        }

        // Pre-create 5 instant matches (user 1 has already liked users 2–6, and they liked back)
        for (long i = 2; i <= 6; i++) {
            swipeRepo.save(new Swipe(1L, i, true));
        }
    }
}
