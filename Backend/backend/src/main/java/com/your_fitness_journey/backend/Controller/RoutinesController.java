package com.your_fitness_journey.backend.Controller;

import com.your_fitness_journey.backend.Model.Exercises.ExerciseDayDTO;
import com.your_fitness_journey.backend.Model.Routines.FullRoutineInfoDTO;
import com.your_fitness_journey.backend.Model.Routines.Routine;
import com.your_fitness_journey.backend.Model.Routines.UserRoutineDayExercise;
import com.your_fitness_journey.backend.Model.Routines.UserRoutineProgress;
import com.your_fitness_journey.backend.Model.Users.User;
import com.your_fitness_journey.backend.Service.RoutineService;
import com.your_fitness_journey.backend.Service.UserService;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/routine")
public class RoutinesController {

    private final UserService userService;
    private final RoutineService routineService;

    @Autowired
    public RoutinesController(UserService userService, RoutineService routineService) {
        this.userService = userService;
        this.routineService = routineService;
    }

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

    @GetMapping("/publicRoutines")
    public ResponseEntity<Object> getPublicRoutines(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

            String jwt = authorizationHeader.substring(7); // Remove prefix "Bearer " from the header to get the token);

            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if (userOptional.isPresent()) {
                List<FullRoutineInfoDTO> routines = routineService.getPublicRoutines(userOptional.get());
                return ResponseEntity.ok(routines);
            } else {
                return ResponseEntity.status(401).body("Invalid token");
            }
        }
        return ResponseEntity.status(401).body("Token not found");
    }

    @GetMapping("/userRoutines")
    public ResponseEntity<Object> getUserRoutines(@RequestHeader("Authorization") String authorizationHeader ) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

            String jwt = authorizationHeader.substring(7); // Remove prefix "Bearer " from the header to get the token);

            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if (userOptional.isPresent()) {
                List<FullRoutineInfoDTO> routines = routineService.getUserRoutines(userOptional.get());
                return ResponseEntity.ok(routines);
            } else {
                return ResponseEntity.status(401).body("Invalid token");
            }
        }
        return ResponseEntity.status(401).body("Token not found");
    }

    @PutMapping("/updateRoutine")
    public ResponseEntity<Object> updateRoutine(@RequestHeader("Authorization") String authorizationHeader, @RequestBody FullRoutineInfoDTO routineInfo) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if (userOptional.isPresent()) {
               Routine routine = routineService.updateRoutine(routineInfo, userOptional.get());
               return ResponseEntity.ok(routine);
            }
            else{
                return ResponseEntity.status(401).body("Invalid token");
            }
        }
        else{
            return ResponseEntity.status(401).body("Token not found");
        }
    }

    @PutMapping("/setRoutineAsActive/{routineId}")
    public ResponseEntity<Object> setRoutineAsActive(@RequestHeader("Authorization") String authorizationHeader, @PathVariable("routineId") long routineId) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if (userOptional.isPresent()) {
                UserRoutineProgress activeRoutine = routineService.setRoutineAsActive(routineId, userOptional.get());
                return ResponseEntity.ok(activeRoutine);
            }
            else{
                return ResponseEntity.status(401).body("Invalid token");
            }
        }
        else{
            return ResponseEntity.status(401).body("Token not found");
        }
    }

    @PostMapping("/copyRoutine")
    public ResponseEntity<Object> copyRoutine(@RequestHeader("Authorization") String authorizationHeader, @RequestBody FullRoutineInfoDTO routineInfo) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if (userOptional.isPresent()) {
                Set<UserRoutineDayExercise> newRoutine = routineService.copyRoutine(routineInfo, userOptional.get());
                return ResponseEntity.ok(newRoutine);
            }
            else{
                return ResponseEntity.status(401).body("Invalid token");
            }
        }
        else{
            return ResponseEntity.status(401).body("Token not found");
        }
    }

    @GetMapping("/getTodayExercises")
    public ResponseEntity<Object> getTodayRoutine(@RequestHeader("Authorization") String authorizationHeader) {
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if (userOptional.isPresent()) {
                ExerciseDayDTO todayExercisesList = routineService.getTodayExercises(userOptional.get());
                return ResponseEntity.ok(todayExercisesList);
            }
            else{
                return ResponseEntity.status(401).body("Invalid token");
            }
        }
        else{
            return ResponseEntity.status(401).body("Token not found");
        }
    }

    @GetMapping("/getActiveRoutineDays")
    public ResponseEntity<Object> getActiveRoutine(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if (userOptional.isPresent()) {
                List<ExerciseDayDTO> activeRoutineDays = routineService.getActiveRoutine(userOptional.get());
                return ResponseEntity.ok(activeRoutineDays);
            }
            else{
                return ResponseEntity.status(401).body("Invalid token");
            }
        }
        else{
            return ResponseEntity.status(401).body("Token not found");
        }
    }

    /**
     * This only changes to the active day of the active routine from the param
     * @param authorizationHeader
     * @param dayOrder
     */
    @PutMapping("/changeActiveDay/{dayOrder}")
    public ResponseEntity<Object> changeAActiveDay(@RequestHeader("Authorization") String authorizationHeader, @PathVariable int dayOrder) {
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if (userOptional.isPresent()) {
                routineService.changeActiveDay(userOptional.get(), dayOrder);
                return ResponseEntity.ok().build();
            }
            else{
                return ResponseEntity.status(401).body("Invalid token");
            }
        }
        else{
            return ResponseEntity.status(401).body("Token not found");
        }
    }

    @PutMapping("/updateTodayWorkout")
    public ResponseEntity<Object> updateWorkoutProgress(@RequestHeader("Authorization") String authorizationHeader, @RequestBody ExerciseDayDTO exerciseDayDTO) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if (userOptional.isPresent()) {
                boolean updated = routineService.updateTodayWorkout(userOptional.get(), exerciseDayDTO);
                if(updated){
                    return ResponseEntity.ok().build();
                }
                else{
                    return ResponseEntity.status(401).body("Ha ocurrido un error al actualizar el entrenamiento");
                }
            }
            else{
                return ResponseEntity.status(401).body("Invalid token");
            }
        }
        else {
            return ResponseEntity.status(401).body("Token not found");
        }
    }


    @DeleteMapping("/deleteRoutine/{routineId}")
    public ResponseEntity<Object> deleteRoutine(@RequestHeader("Authorization") String authorizationHeader, @PathVariable("routineId") long routineId) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if (userOptional.isPresent()) {
                Routine routine = routineService.deleteRoutine(routineId, userOptional.get());
                if (routine != null) {
                    return ResponseEntity.ok(routine);
                }
                else{
                    return ResponseEntity.status(400).body("You cant delete an active routine or the routine does not exist");
                }
            }
            else {
                return ResponseEntity.status(401).body("Invalid token");
            }
        }
        return ResponseEntity.status(401).body("Token not found");
    }

}
