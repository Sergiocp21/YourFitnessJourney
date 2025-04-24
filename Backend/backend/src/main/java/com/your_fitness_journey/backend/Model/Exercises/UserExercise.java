package com.your_fitness_journey.backend.Model.Exercises;

import com.your_fitness_journey.backend.Model.Users.User;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

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

    public UserExercise(){}

    public UserExerciseId getId() {
        return id;
    }

    public void setId(UserExerciseId id) {
        this.id = id;
    }

    public User getGoogle() {
        return google;
    }

    public void setGoogle(User google) {
        this.google = google;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public Integer getLastReps() {
        return lastReps;
    }

    public void setLastReps(Integer lastReps) {
        this.lastReps = lastReps;
    }

    public BigDecimal getLastWeight() {
        return lastWeight;
    }

    public void setLastWeight(BigDecimal lastWeight) {
        this.lastWeight = lastWeight;
    }

}