package com.your_fitness_journey.backend.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "user_exercises")
public class UserExercise {
    @EmbeddedId
    private UserExerciseId id;

    @MapsId("googleId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "google_id", nullable = false)
    private User google;

    @MapsId("exerciseId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Column(name = "last_reps")
    private Integer lastReps;

    @Column(name = "last_weight", precision = 5, scale = 2)
    private BigDecimal lastWeight;

}