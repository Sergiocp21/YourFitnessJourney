package com.your_fitness_journey.backend.Repository;

import com.your_fitness_journey.backend.Model.UserRoutine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRoutineRepository extends JpaRepository<UserRoutine, Integer> {
}
