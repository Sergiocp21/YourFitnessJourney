package com.your_fitness_journey.backend.Service;

import com.your_fitness_journey.backend.Model.Exercises.Exercise;
import com.your_fitness_journey.backend.Model.Exercises.MuscleGroup;
import com.your_fitness_journey.backend.Model.Exercises.UserExercise;
import com.your_fitness_journey.backend.Model.Exercises.UserExerciseId;
import com.your_fitness_journey.backend.Model.Routines.UserRoutineDayExercise;
import com.your_fitness_journey.backend.Model.Routines.UserRoutineProgress;
import com.your_fitness_journey.backend.Model.Users.User;
import com.your_fitness_journey.backend.Repository.IExerciseRepository;
import com.your_fitness_journey.backend.Repository.IUserExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExerciseService {

    private final IExerciseRepository exerciseRepository;
    private final IUserExerciseRepository userExerciseRepository;

    @Autowired
    public ExerciseService(IExerciseRepository exerciseRepository, IUserExerciseRepository userExerciseRepository) {
        this.exerciseRepository = exerciseRepository;
        this.userExerciseRepository = userExerciseRepository;
    }

    public List<Exercise> getByMuscleGroup(MuscleGroup muscleGroup) {
        return exerciseRepository.getExercisesByMuscleGroup(muscleGroup);
    }

    public Optional<Exercise> getExerciseById(Long id) {
        return exerciseRepository.findById(id);
    }

    public Optional <UserExercise> getUserExercise(User user, Exercise exercise) {
        return userExerciseRepository.findUserExercisesByExerciseAndUser(exercise, user);
    }

    public Map<Long, UserExercise> getUserExercises(User user, List<Exercise> exercises) {
        if (exercises == null || exercises.isEmpty()) return Map.of();

        List<Long> exerciseIds = exercises.stream()
                .map(Exercise::getId)
                .distinct()
                .toList();

        List<UserExercise> userExercises = userExerciseRepository
                .findByUserAndExerciseIds(user.getGoogleId(), exerciseIds);

        return userExercises.stream()
                .collect(Collectors.toMap(ue -> ue.getExercise().getId(), ue -> ue));
    }


    public boolean updateUserExercise(User user, Exercise exercise, BigDecimal weight, int reps, String note) {
        Optional <UserExercise> userExerciseOptional = userExerciseRepository.findUserExercisesByExerciseAndUser(exercise, user);

        if(userExerciseOptional.isPresent()){
            UserExercise userExercise = userExerciseOptional.get();
            userExercise.setLastWeight(weight);
            userExercise.setLastReps(reps);
            userExercise.setExerciseNote(note);
            userExerciseRepository.save(userExercise);
            return true;
        }
        return false;

    }

    public UserExercise saveUserExercise(UserExercise userExercise) {
        return userExerciseRepository.save(userExercise);
    }

}


