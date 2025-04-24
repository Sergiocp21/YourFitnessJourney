package com.your_fitness_journey.backend.Model.Routines;

import com.your_fitness_journey.backend.Model.Exercises.Exercise;

import java.util.List;

public class ExerciseDayDTO {
    int order;
    String name;
    List<Long> exercisesId;

    public int getOrder() {
        return order;
    }

    public String getName() {
        return name;
    }

    public List<Long> getExercisesId() {
        return exercisesId;
    }
}
