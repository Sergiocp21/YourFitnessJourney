package com.your_fitness_journey.backend.Service;

import com.your_fitness_journey.backend.Model.JPA.Exercises.Exercise;
import com.your_fitness_journey.backend.Model.JPA.Exercises.UserExercise;
import com.your_fitness_journey.backend.Model.JPA.Users.User;
import com.your_fitness_journey.backend.Model.MongoDB.Statistics.UserExercisesLog;
import com.your_fitness_journey.backend.Repository.MongoDB.IUserExercisesLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class StatisticsService {

    IUserExercisesLogRepository userExercisesLogRepository;
    ExerciseService exerciseService;

    @Autowired
    public StatisticsService(IUserExercisesLogRepository userExercisesLogRepository, ExerciseService exerciseService) {
        this.userExercisesLogRepository = userExercisesLogRepository;
        this.exerciseService = exerciseService;
    }

    public List<UserExercisesLog> getUserStatisticsByExercise(User user, long exerciseId){
        List<UserExercisesLog> userExercisesLog = null;
        Optional<Exercise> exercise = exerciseService.getExerciseById(exerciseId);
        if (exercise.isPresent()) {
            userExercisesLog = userExercisesLogRepository.findAllByUserIdAndExerciseId(user.getGoogleId(), exerciseId);
        }
        return userExercisesLog;
    }

    public void postUserExerciseLog(UserExercise userExercise){
        UserExercisesLog userExercisesLog = new UserExercisesLog(userExercise.getUser().getGoogleId(), userExercise.getExercise().getId(), userExercise.getLastReps(), userExercise.getLastWeight().doubleValue(), LocalDate.now());
        userExercisesLogRepository.save(userExercisesLog);
    }
}
