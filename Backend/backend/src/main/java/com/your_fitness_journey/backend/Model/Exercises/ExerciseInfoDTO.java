package com.your_fitness_journey.backend.Model.Exercises;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ExerciseInfoDTO {
    @JsonProperty("id")
    Long exerciseId;

    String name;

    @JsonProperty("sets")
    int numSets;

    public Long getExerciseId() {
        return exerciseId;
    }

    public String getName() {
        return name;
    }

    public int getNumSets() {
        return numSets;
    }

    public void setExerciseId(Long exerciseId) {
        this.exerciseId = exerciseId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNumSets(int numSets) {
        this.numSets = numSets;
    }
}
