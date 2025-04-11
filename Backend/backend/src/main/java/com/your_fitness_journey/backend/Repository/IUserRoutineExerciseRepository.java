package com.your_fitness_journey.backend.Repository;

import com.your_fitness_journey.backend.Model.UserRoutineExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRoutineExerciseRepository extends JpaRepository<UserRoutineExercise, Integer> {
}
