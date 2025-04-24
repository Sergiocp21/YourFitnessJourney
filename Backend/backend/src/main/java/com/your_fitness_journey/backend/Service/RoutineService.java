package com.your_fitness_journey.backend.Service;

import com.your_fitness_journey.backend.Model.Exercises.Exercise;
import com.your_fitness_journey.backend.Model.Exercises.ExerciseDayDTO;
import com.your_fitness_journey.backend.Model.Exercises.ExerciseInfoDTO;
import com.your_fitness_journey.backend.Model.Routines.UserRoutineDayExercise;
import com.your_fitness_journey.backend.Model.Routines.*;
import com.your_fitness_journey.backend.Model.Users.User;
import com.your_fitness_journey.backend.Repository.IRoutineDayRepository;
import com.your_fitness_journey.backend.Repository.IRoutineRepository;
import com.your_fitness_journey.backend.Repository.IUserRoutineDayExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoutineService {

    private final ExerciseService exerciseService;
    private final IRoutineRepository routineRepository;
    private final IRoutineDayRepository routineDayRepository;
    private final IUserRoutineDayExerciseRepository userRoutineDayExerciseRepository;

    @Autowired
    public RoutineService(IRoutineDayRepository routineDayRepository, IUserRoutineDayExerciseRepository userRoutineExerciseRepository, IRoutineRepository routineRepository, ExerciseService exerciseService) {
        this.routineDayRepository = routineDayRepository;
        this.userRoutineDayExerciseRepository = userRoutineExerciseRepository;
        this.routineRepository = routineRepository;
        this.exerciseService = exerciseService;
    }

    public Set<UserRoutineDayExercise> createRoutine(FullRoutineInfoDTO routineInfo, User user) { //Routine table
        Routine routine = new Routine(user, routineInfo.getName(), routineInfo.getDescription(), routineInfo.isPublic());

        Set<UserRoutineDayExercise> exercisesPerDay = new HashSet<>();

        for(ExerciseDayDTO exerciseDayDTO : routineInfo.getExerciseDays()) { //Day by day
            RoutineDay routineDay = new RoutineDay(routine, exerciseDayDTO.getOrder(), exerciseDayDTO.getName());
            for(ExerciseInfoDTO exerciseInfoDTO : exerciseDayDTO.getExercises()) {
                Optional<Exercise> optionalExercise = exerciseService.getExerciseById(exerciseInfoDTO.getExerciseId());
                if(optionalExercise.isPresent()) {
                    UserRoutineDayExercise exerciseDay = new UserRoutineDayExercise(user, routineDay, optionalExercise.get(), exerciseInfoDTO.getNumSets());
                    routineRepository.save(routine);
                    routineDayRepository.save(routineDay);
                    userRoutineDayExerciseRepository.save(exerciseDay);
                    exercisesPerDay.add(exerciseDay);
                }
                else{
                    return new HashSet<>();
                }

            }

        }

        return exercisesPerDay;
    }


}
