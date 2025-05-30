package com.your_fitness_journey.backend.Model.Exercises;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class ExerciseInfoDTO {
    @JsonProperty("id")
    Long exerciseId;

    @JsonProperty("sets")
    int numSets;

    String name;
    BigDecimal weight;
    int reps;
    int order;
    String notes;


    public Long getExerciseId() {
        return exerciseId;
    }

    public String getName() {
        return name;
    }

    public int getNumSets() {
        return numSets;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public int getReps() {
        return reps;
    }

    public int getOrder() { return order; }

    public String getNotes() { return notes; }

    public void setExerciseId(Long exerciseId) {
        this.exerciseId = exerciseId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNumSets(int numSets) {
        this.numSets = numSets;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public void setReps(int reps) {
        this.reps = reps;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
