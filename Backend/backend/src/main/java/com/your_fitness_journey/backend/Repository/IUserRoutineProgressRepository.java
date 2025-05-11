package com.your_fitness_journey.backend.Repository;

import com.your_fitness_journey.backend.Model.Routines.UserRoutineProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRoutineProgressRepository extends JpaRepository<UserRoutineProgress, String> {
    UserRoutineProgress findByGoogleId(String googleId);
}
