package com.your_fitness_journey.backend.Repository;

import com.your_fitness_journey.backend.Model.UserRoutineProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRoutineProgress extends JpaRepository<UserRoutineProgress, Long> {
}
