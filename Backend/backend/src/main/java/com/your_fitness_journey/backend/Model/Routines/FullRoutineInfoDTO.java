package com.your_fitness_journey.backend.Model;

import java.util.List;

class ExerciseDay{
    int order;
    String name;
    List<Exercise> exercises;
}

public class FullRoutineInfoDTO {
    String name;
    String description;
    boolean isPublic;
    List<ExerciseDay> exerciseDays;
}
