package com.your_fitness_journey.backend.Model.MongoDB.Statistics;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDate;

@Document(collection = "user_exercises_logs")
public class UserExercisesLog {

    @Id
    private String id;

    private String userId;
    private long exerciseId;
    private LocalDate date;
    private double weight;
    private int repetitions;

    public UserExercisesLog(String userId, long exerciseId, int repetitions, double weight, LocalDate date) {
        this.userId = userId;
        this.exerciseId = exerciseId;
        this.repetitions = repetitions;
        this.weight = weight;
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public long getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(long exerciseId) {
        this.exerciseId = exerciseId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public int getRepetitions() {
        return repetitions;
    }

    public void setRepetitions(int repetitions) {
        this.repetitions = repetitions;
    }
}
