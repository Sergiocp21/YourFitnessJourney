package com.your_fitness_journey.backend.Repository;

import com.your_fitness_journey.backend.Model.RoutineDay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoutineDay extends JpaRepository<RoutineDay, Long> {

}
