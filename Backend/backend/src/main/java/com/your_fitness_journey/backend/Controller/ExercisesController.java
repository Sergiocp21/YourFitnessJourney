package com.your_fitness_journey.backend.Controller;

import com.your_fitness_journey.backend.Model.JPA.Exercises.Exercise;
import com.your_fitness_journey.backend.Model.JPA.Exercises.ExerciseInfoDTO;
import com.your_fitness_journey.backend.Model.JPA.Exercises.MuscleGroup;
import com.your_fitness_journey.backend.Model.JPA.Users.User;
import com.your_fitness_journey.backend.Service.ExerciseService;
import com.your_fitness_journey.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/exercises")
public class ExercisesController {

    ExerciseService exerciseService;
    UserService userService;

    @Autowired
    public ExercisesController(ExerciseService exerciseService, UserService userService) {
        this.exerciseService = exerciseService;
        this.userService = userService;
    }

    @GetMapping("/types")
    public ResponseEntity<List<MuscleGroup>> getAllTypes(){
        return ResponseEntity.ok().body(Arrays.asList(MuscleGroup.values()));
    }

    @GetMapping("/byMuscleGroup")
    public ResponseEntity<List<Exercise>>getExercisesByMuscleGroup(@RequestParam MuscleGroup muscleGroup){
        return ResponseEntity.ok().body(exerciseService.getByMuscleGroup(muscleGroup));
    }

    @GetMapping("/getUserExercises")
    public ResponseEntity<Object> getUserExercises(@RequestHeader("Authorization") String authorizationHeader){
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if (userOptional.isPresent()) {
                List<Exercise> exercises = exerciseService.getExercisesByUser(userOptional.get());
                List<ExerciseInfoDTO> exerciseInfoDTOList = new ArrayList<>();
                exercises.forEach(exercise -> {
                    ExerciseInfoDTO exInfo = new ExerciseInfoDTO();
                    exInfo.setExerciseId(exercise.getId());
                    exInfo.setName(exercise.getName());
                    exerciseInfoDTOList.add(exInfo);
                });

                return ResponseEntity.ok().body(exerciseInfoDTOList);
            }
            else{
                return ResponseEntity.status(401).body("Invalid token");
            }
        }
        else{
            return ResponseEntity.status(401).body("Token not found");
        }
    }



}
