package com.your_fitness_journey.backend.Repository.JPA;

import com.your_fitness_journey.backend.Model.JPA.Exercises.Exercise;
import com.your_fitness_journey.backend.Model.JPA.Exercises.UserExercise;
import com.your_fitness_journey.backend.Model.JPA.Exercises.UserExerciseId;
import com.your_fitness_journey.backend.Model.JPA.Users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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

    List<UserExercise> findAllByUser(User user);
}
