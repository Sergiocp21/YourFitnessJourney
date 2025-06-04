package com.your_fitness_journey.backend.Repository.JPA;

import com.your_fitness_journey.backend.Model.JPA.Users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, String> {
    Optional<User> findByGoogleId(String googleId);
}
