package com.your_fitness_journey.backend.Repository;

import com.your_fitness_journey.backend.Model.Routines.UserRoutineDayExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRoutineDayExerciseRepository extends JpaRepository<UserRoutineDayExercise, Integer> {
}
