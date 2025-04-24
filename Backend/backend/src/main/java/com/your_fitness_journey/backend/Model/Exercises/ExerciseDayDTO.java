package com.your_fitness_journey.backend.Model.Exercises;

import java.util.List;

public class ExerciseDayDTO {
    int order;
    String name;
    List<ExerciseInfoDTO> exercises;

    public int getOrder() {
        return order;
    }

    public String getName() {
        return name;
    }

    public List<ExerciseInfoDTO> getExercises() {
        return exercises;
    }
}
