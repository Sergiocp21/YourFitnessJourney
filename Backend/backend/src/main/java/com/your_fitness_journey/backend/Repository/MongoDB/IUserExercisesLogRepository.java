package com.your_fitness_journey.backend.Repository.MongoDB;

import com.your_fitness_journey.backend.Model.MongoDB.Statistics.UserExercisesLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUserExercisesLogRepository extends MongoRepository<UserExercisesLog, String> {

    List<UserExercisesLog> findAllByUserIdAndExerciseId(String userId, long exerciseId);
}
