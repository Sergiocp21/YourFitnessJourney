package com.your_fitness_journey.backend.Controller;

import com.your_fitness_journey.backend.Model.JPA.Users.User;
import com.your_fitness_journey.backend.Model.MongoDB.Statistics.UserExercisesLog;
import com.your_fitness_journey.backend.Service.StatisticsService;
import com.your_fitness_journey.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    private final UserService userService;
    private final StatisticsService statisticsService;

    @Autowired
    public StatisticsController(UserService userService, StatisticsService statisticsService) {
        this.userService = userService;
        this.statisticsService = statisticsService;
    }

    @GetMapping("getUserExerciseStatistics/{exerciseId}")
    public ResponseEntity<Object> findUserStatisticsByExercise(@RequestHeader("Authorization") String authorizationHeader, @PathVariable  long exerciseId) {
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);

            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if (userOptional.isPresent()) {
                List<UserExercisesLog> log = statisticsService.getUserStatisticsByExercise(userOptional.get(), exerciseId);
                return ResponseEntity.ok(log);
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
