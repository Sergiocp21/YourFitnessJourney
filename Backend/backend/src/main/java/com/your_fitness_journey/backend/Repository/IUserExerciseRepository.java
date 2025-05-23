package com.your_fitness_journey.backend.Repository;

import com.your_fitness_journey.backend.Model.Exercises.UserExercise;
import com.your_fitness_journey.backend.Model.Exercises.UserExerciseId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserExerciseRepository extends JpaRepository<UserExercise, UserExerciseId> {
}
