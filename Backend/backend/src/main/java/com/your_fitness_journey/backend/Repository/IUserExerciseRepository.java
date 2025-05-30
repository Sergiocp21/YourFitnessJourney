package com.your_fitness_journey.backend.Repository;

import com.your_fitness_journey.backend.Model.Exercises.Exercise;
import com.your_fitness_journey.backend.Model.Exercises.UserExercise;
import com.your_fitness_journey.backend.Model.Exercises.UserExerciseId;
import com.your_fitness_journey.backend.Model.Routines.UserRoutineDayExercise;
import com.your_fitness_journey.backend.Model.Users.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface IUserExerciseRepository extends JpaRepository<UserExercise, UserExerciseId> {

    Optional<UserExercise> findUserExercisesByExerciseAndUser(Exercise exercise, User user);

    @Query("""
    SELECT ue FROM UserExercise ue
    WHERE ue.id.googleId = :googleId
    AND ue.id.exerciseId IN :exerciseIds
    """)
    List<UserExercise> findByUserAndExerciseIds(
            @Param("googleId") String googleId,
            @Param("exerciseIds") List<Long> exerciseIds
    );

}
