package com.your_fitness_journey.backend.Model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    public User() {
        createdAt = Instant.now();
    }

    public User(String googleId, String email, String name, String picture) {
        this.googleId = googleId;
        this.email = email;
        this.name = name;
        this.pictureUrl = picture;
        createdAt = Instant.now();
    }

    @Id
    @Column(name = "google_id", nullable = false, length = 50)
    private String googleId;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "picture_url")
    private String pictureUrl;

    @Column(name = "height", precision = 5, scale = 2)
    private BigDecimal height;

    @Column(name = "weight", precision = 5, scale = 2)
    private BigDecimal weight;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @OneToMany(mappedBy = "user")
    private Set<RoutineExercise> routineExercises = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Routine> routines = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<UserRoutine> userRoutines = new LinkedHashSet<>();

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public BigDecimal getHeight() {
        return height;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Set<RoutineExercise> getRoutineExercises() {
        return routineExercises;
    }

    public Set<Routine> getRoutines() {
        return routines;
    }

    public Set<UserRoutine> getUserRoutines() {
        return userRoutines;
    }
}