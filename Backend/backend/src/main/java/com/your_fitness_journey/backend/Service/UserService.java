package com.your_fitness_journey.backend.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.your_fitness_journey.backend.Model.JPA.Users.UpdateUserInfoDTO;
import com.your_fitness_journey.backend.Model.JPA.Users.User;
import com.your_fitness_journey.backend.Repository.JPA.IUserRepository;
import com.your_fitness_journey.backend.Security.JWT.JwtUtils;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class UserService {

    private final JwtUtils jwtUtils;
    private final IUserRepository userRepository;
    private long cachedUserCount = 0;

    @Autowired
    public UserService(IUserRepository userRepository, JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void init() {
        // Esto se ejecutará después de que Hibernate haya creado las tablas
        long count = refreshUserCount();
        System.out.println("Users en la base de datos: " + count);
    }

    public String loginUser(GoogleIdToken idToken) {
        GoogleIdToken.Payload googleUser = idToken.getPayload();

        // Get user data
        String userId = (String) googleUser.get("sub");
        String email = (String) googleUser.get("email");
        String name = (String) googleUser.get("name");
        String picture = (String) googleUser.get("picture");

        // Log user information (for debugging)
        System.out.println("User ID: " + userId);
        System.out.println("Email: " + email);
        System.out.println("Name: " + name);

        // Search user in the database
        Optional<User> existingUser = userRepository.findByGoogleId(userId);

        if(existingUser.isEmpty()) { // If it doesnt exist, create one user and saves it on the database
            User newUser = new User(userId, email, name, picture);
            userRepository.save(newUser);
        }

        return jwtUtils.generateToken(userId);
    }

    public Optional<User> getUserFromJWT(String jwt) {
        if(jwtUtils.validateToken(jwt)){
            String idUser = jwtUtils.getSubjectFromToken(jwt);
            return userRepository.findByGoogleId(idUser);
        }
        return Optional.empty();
    }

    public Optional<User> updateUser(String jwt, UpdateUserInfoDTO userChanges) {
        String idUser = jwtUtils.getSubjectFromToken(jwt);
        Optional<User> existingUser = userRepository.findByGoogleId(idUser);
        if (existingUser.isPresent()) {
            if(userChanges.getName() != null && !"".equals(userChanges.getName())) {
                existingUser.get().setName(userChanges.getName());
            }
            if(userChanges.getEmail() != null && !"".equals(userChanges.getEmail())) {
                existingUser.get().setEmail(userChanges.getEmail());
            }
            existingUser.get().setPictureUrl(userChanges.getPictureUrl());
            existingUser.get().setHeight(new BigDecimal(userChanges.getHeight()));
            existingUser.get().setWeight(new BigDecimal(userChanges.getWeight()));

            userRepository.save(existingUser.get());
        }
        return existingUser;
    }

    @Cacheable("userCount")
    public long getUserCount() {
        return cachedUserCount;
    }

    @Scheduled(fixedRate = 5 * 60 * 1000) //Ask the database each 5 minutes
    @CachePut("userCount")
    public long refreshUserCount() {
        long count = userRepository.count();
        this.cachedUserCount = count;
        return count;
    }
}
