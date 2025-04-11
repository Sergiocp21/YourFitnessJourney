package com.your_fitness_journey.backend.Repository;

import com.your_fitness_journey.backend.Model.UserExercise;
import com.your_fitness_journey.backend.Model.UserExerciseId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserExerciseRepository extends JpaRepository<UserExercise, UserExerciseId> {
}
