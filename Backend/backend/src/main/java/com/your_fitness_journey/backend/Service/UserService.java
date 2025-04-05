package com.your_fitness_journey.backend.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.your_fitness_journey.backend.Model.User;
import com.your_fitness_journey.backend.Repository.IUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.your_fitness_journey.backend.Security.JWT.JwtUtils;

import java.util.Optional;

@Service
public class UserService {

    private final JwtUtils jwtUtils;
    private final IUserRepository userRepository;

    @Autowired
    public UserService(IUserRepository userRepository, JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
    }

    public String loadUser(GoogleIdToken idToken) {
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

    public User getUser(String id) {
        return userRepository.findByGoogleId(id).orElse(null);
    }

    public Optional<User> getUserFromJWT(String jwt) {
        if(jwtUtils.validateToken(jwt)){
            String idUsuario = jwtUtils.getSubjectFromToken(jwt);
            return userRepository.findByGoogleId(idUsuario);
        }
        return Optional.empty();
    }
}
