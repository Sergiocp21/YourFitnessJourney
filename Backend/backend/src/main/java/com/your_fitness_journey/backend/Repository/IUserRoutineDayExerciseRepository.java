package com.your_fitness_journey.backend.Repository;

import com.your_fitness_journey.backend.Model.Routines.RoutineDay;
import com.your_fitness_journey.backend.Model.Routines.UserRoutineDayExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUserRoutineDayExerciseRepository extends JpaRepository<UserRoutineDayExercise, Integer> {

    void deleteById(Long id);

    void deleteUserRoutineDayExerciseByRoutineDay(RoutineDay routineDay);

    List<UserRoutineDayExercise> getUserRoutineDayExercisesByRoutineDay_IdOrderByExerciseOrderAsc(Long id);

    @Query("SELECT ude FROM UserRoutineDayExercise ude " +
            "JOIN FETCH ude.exercise " +
            "WHERE ude.routineDay = :routineDay " +
            "ORDER BY ude.exerciseOrder ASC")
    List<UserRoutineDayExercise> findUserRoutineDayExercisesByRoutineDayOrderByExerciseOrder(@Param("routineDay") RoutineDay routineDay);


}

