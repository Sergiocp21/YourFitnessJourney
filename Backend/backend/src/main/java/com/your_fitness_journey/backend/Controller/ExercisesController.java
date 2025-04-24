package com.your_fitness_journey.backend.Controller;

import com.your_fitness_journey.backend.Model.Exercises.Exercise;
import com.your_fitness_journey.backend.Model.Exercises.MuscleGroup;
import com.your_fitness_journey.backend.Service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/exercises")
public class ExercisesController {

    ExerciseService exerciseService;

    @Autowired
    public ExercisesController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping("/types")
    public ResponseEntity<List<MuscleGroup>> getAllTypes(){
        return ResponseEntity.ok().body(Arrays.asList(MuscleGroup.values()));
    }

    @GetMapping("/byMuscleGroup")
    public ResponseEntity<List<Exercise>>getExercisesByMuscleGroup(@RequestParam MuscleGroup muscleGroup){
        return ResponseEntity.ok().body(exerciseService.getByMuscleGroup(muscleGroup));
    }

}
