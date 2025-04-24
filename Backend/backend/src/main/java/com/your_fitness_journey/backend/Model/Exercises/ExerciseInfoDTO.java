package com.your_fitness_journey.backend.Model.Exercises;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ExerciseInfoDTO {
    @JsonProperty("id")
    Long exerciseId;
    @JsonProperty("sets")
    int numSets;

    public Long getExerciseId() {
        return exerciseId;
    }

    public int getNumSets() {
        return numSets;
    }
}
