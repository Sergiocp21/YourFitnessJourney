package com.your_fitness_journey.backend.Repository;

import com.your_fitness_journey.backend.Model.Routines.Routine;
import com.your_fitness_journey.backend.Model.Routines.RoutineDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRoutineDayRepository extends JpaRepository<RoutineDay, Long> {
    List<RoutineDay> getRoutineDayByRoutine_Id(Long routineId);

    void deleteById(Long id);

    List<RoutineDay> findRoutineDayByRoutine(Routine routine);
}
