package com.your_fitness_journey.backend.Model.JPA.Exercises;

import com.your_fitness_journey.backend.Model.JPA.Users.User;
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
    private User user;

    @MapsId("exerciseId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Column(name = "last_reps")
    private Integer lastReps;

    @Column(name = "last_weight", precision = 5, scale = 2)
    private BigDecimal lastWeight;

    @Column(name = "exercise_note")
    private String exerciseNote;

    public UserExercise(){}

    public UserExercise(User user, Exercise exercise, BigDecimal weight, int reps) {
        this.user = user;
        this.exercise = exercise;
        this.id = new UserExerciseId(user.getGoogleId(), exercise.getId());
        this.lastWeight = weight;
        this.lastReps = reps;
        this.exerciseNote = "";
    }

    public UserExercise(User user, Exercise exercise, BigDecimal weight, int reps, String notes) {
        this.user = user;
        this.exercise = exercise;
        this.id = new UserExerciseId(user.getGoogleId(), exercise.getId());
        this.lastWeight = weight;
        this.lastReps = reps;
        this.exerciseNote = notes;
    }

    public UserExerciseId getId() {
        return id;
    }

    public void setId(UserExerciseId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public String getExerciseNote() {
        return exerciseNote;
    }

    public void setExerciseNote(String exerciseNote) {
        this.exerciseNote = exerciseNote;
    }
}