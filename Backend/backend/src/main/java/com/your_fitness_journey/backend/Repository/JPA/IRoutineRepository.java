package com.your_fitness_journey.backend.Repository.JPA;

import com.your_fitness_journey.backend.Model.JPA.Routines.Routine;
import com.your_fitness_journey.backend.Model.JPA.Users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRoutineRepository extends JpaRepository<Routine, Long> {

    public List<Routine> getRoutinesByIsPublicIsTrue();

    List<Routine> getRoutinesByUser(User user);

    List<Routine> getRoutinesByIsPublicIsTrueAndUserIsNot(User user);
}
