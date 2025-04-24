package com.your_fitness_journey.backend.Controller;

import com.your_fitness_journey.backend.Model.Routines.FullRoutineInfoDTO;
import com.your_fitness_journey.backend.Model.Routines.Routine;
import com.your_fitness_journey.backend.Model.Routines.UserRoutineDayExercise;
import com.your_fitness_journey.backend.Model.Users.User;
import com.your_fitness_journey.backend.Service.RoutineService;
import com.your_fitness_journey.backend.Service.UserService;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/routine")
public class RoutinesController {

    private UserService userService;
    private RoutineService routineService;

    @Autowired
    public RoutinesController(UserService userService, RoutineService routineService) {
        this.userService = userService;
        this.routineService = routineService;
    }

    public static final Dotenv env = Dotenv.load();

    private final String CLIENT_ID = env.get("CLIENT_ID");

    @PostMapping("/saveRoutine")
    public ResponseEntity<Object> saveRoutine(@RequestHeader("Authorization") String authorizationHeader, @RequestBody FullRoutineInfoDTO routineInfo) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

            String jwt = authorizationHeader.substring(7); // Remove prefix "Bearer " from the header to get the token);

            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if (userOptional.isPresent()) {
                Set<UserRoutineDayExercise> routineExercises = routineService.createRoutine(routineInfo, userOptional.get());
                return ResponseEntity.ok(routineExercises);
            }
            else{
                return ResponseEntity.status(401).body("Invalid token");
            }
        }
        return ResponseEntity.status(401).body("Token not found");
    }
}
