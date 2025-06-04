package com.your_fitness_journey.backend.Model.JPA.Routines;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.your_fitness_journey.backend.Model.JPA.Exercises.ExerciseDayDTO;

import java.util.List;

public class FullRoutineInfoDTO {
    long routineId;
    String name;
    String description;
    boolean isPublic;
    @JsonProperty("days")
    List<ExerciseDayDTO> exerciseDays;

    public long getRoutineId() {
        return routineId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public boolean isIsPublic() {
        return isPublic;
    }

    public List<ExerciseDayDTO> getExerciseDays() {
        return exerciseDays;
    }

    public void setRoutineId(long routineId) {
        this.routineId = routineId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public void setExerciseDays(List<ExerciseDayDTO> exerciseDays) {
        this.exerciseDays = exerciseDays;
    }
}
