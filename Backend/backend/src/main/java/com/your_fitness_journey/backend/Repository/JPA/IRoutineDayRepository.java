package com.your_fitness_journey.backend.Repository.JPA;

import com.your_fitness_journey.backend.Model.JPA.Routines.Routine;
import com.your_fitness_journey.backend.Model.JPA.Routines.RoutineDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IRoutineDayRepository extends JpaRepository<RoutineDay, Long> {
    List<RoutineDay> getRoutineDayByRoutine_Id(Long routineId);

    void deleteById(Long id);

    Optional<RoutineDay> findByRoutineAndDayOrder(Routine routine, Integer currentDayOrder);

    @Query("select max(rd.dayOrder) from RoutineDay rd where rd.routine = :routine")
    int findMaxDayByRoutine(Routine routine);
}
