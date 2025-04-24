package com.your_fitness_journey.backend.Model.Routines;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.your_fitness_journey.backend.Model.Exercises.ExerciseDayDTO;

import java.util.List;

public class FullRoutineInfoDTO {
    String name;
    String description;
    boolean isPublic;
    @JsonProperty("days")
    List<ExerciseDayDTO> exerciseDays;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public List<ExerciseDayDTO> getExerciseDays() {
        return exerciseDays;
    }
}
