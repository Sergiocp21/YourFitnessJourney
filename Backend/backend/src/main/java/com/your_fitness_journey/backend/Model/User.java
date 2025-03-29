package com.your_fitness_journey.backend.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    public User() {
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

}