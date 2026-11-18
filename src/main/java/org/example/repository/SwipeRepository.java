package org.example.repository;

import org.example.model.Swipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SwipeRepository extends JpaRepository<Swipe, Long> {

    List<Swipe> findBySwiperId(Long swiperId);

    @Query("SELECT s.swipedId FROM Swipe s WHERE s.swiperId = :swiperId")
    List<Long> findSwipedIdsBySwiperId(Long swiperId);

    boolean existsBySwipedIdAndSwiperIdAndLiked(Long swipedId, Long swiperId, boolean liked);

    @Query("SELECT s.swiperId FROM Swipe s WHERE s.swipedId = :userId AND s.liked = true " +
           "AND s.swiperId IN (SELECT s2.swipedId FROM Swipe s2 WHERE s2.swiperId = :userId AND s2.liked = true)")
    List<Long> findMutualMatchIds(Long userId);
}
