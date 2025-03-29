package com.your_fitness_journey.backend.Repository;

import com.your_fitness_journey.backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByGoogleId(String googleId);
}
