package org.example.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int age;
    private String photo;
    @Column(length = 500)
    private String bio;
    private String city;
    private String interests;

    public User() {}
    public User(String name, int age, String photo, String bio, String city, String interests) {
        this.name = name; this.age = age; this.photo = photo;
        this.bio = bio; this.city = city; this.interests = interests;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getPhoto() { return photo; }
    public String getBio() { return bio; }
    public String getCity() { return city; }
    public String getInterests() { return interests; }
}
