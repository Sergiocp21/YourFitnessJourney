package com.your_fitness_journey.backend.Repository;

import com.your_fitness_journey.backend.Model.RoutineExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoutineExerciseRepository extends JpaRepository<RoutineExercise, Integer> {
}
