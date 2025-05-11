package com.your_fitness_journey.backend.Repository;

import com.your_fitness_journey.backend.Model.Exercises.ExerciseInfoDTO;
import com.your_fitness_journey.backend.Model.Routines.RoutineDay;
import com.your_fitness_journey.backend.Model.Routines.UserRoutineDayExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUserRoutineDayExerciseRepository extends JpaRepository<UserRoutineDayExercise, Integer> {

    List<UserRoutineDayExercise> getUserRoutineDayExercisesByRoutineDay_Id(Long id);

    void deleteById(Long id);

    void deleteUserRoutineDayExerciseByRoutineDay(RoutineDay routineDay);
}
