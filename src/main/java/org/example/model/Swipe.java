package org.example.model;

import jakarta.persistence.*;

@Entity
@Table(name = "swipes", uniqueConstraints = @UniqueConstraint(columnNames = {"swiperId", "swipedId"}))
public class Swipe {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "swiperId") private Long swiperId;
    @Column(name = "swipedId") private Long swipedId;
    private boolean liked;

    public Swipe() {}
    public Swipe(Long swiperId, Long swipedId, boolean liked) {
        this.swiperId = swiperId; this.swipedId = swipedId; this.liked = liked;
    }

    public Long getSwiperId() { return swiperId; }
    public Long getSwipedId() { return swipedId; }
    public boolean isLiked() { return liked; }
}
