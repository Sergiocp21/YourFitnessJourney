package com.your_fitness_journey.backend.Repository.JPA;

import com.your_fitness_journey.backend.Model.JPA.Exercises.Exercise;
import com.your_fitness_journey.backend.Model.JPA.Exercises.MuscleGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> getExercisesByMuscleGroup(MuscleGroup muscleGroup);
}
