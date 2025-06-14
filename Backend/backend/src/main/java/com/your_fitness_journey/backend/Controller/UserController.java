package com.your_fitness_journey.backend.Controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.your_fitness_journey.backend.Model.JPA.Users.UpdateUserInfoDTO;
import com.your_fitness_journey.backend.Model.JPA.Users.User;
import com.your_fitness_journey.backend.Model.JPA.Users.UserNameAndImageDTO;
import com.your_fitness_journey.backend.Model.JPA.Users.UserNameAndTodayRutineNameDTO;
import com.your_fitness_journey.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @Value("${CLIENT_ID}")
    private String CLIENT_ID;

    @PostMapping("/access")
    public ResponseEntity<String> loginWithGoogle(@RequestBody String credential) {
        try {
            // Initialize GoogleIdTokenVerifier
            JsonFactory jsonFactory = GsonFactory.getDefaultInstance();
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(), jsonFactory)
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            // Verify the token
            GoogleIdToken idToken = verifier.verify(credential);
            if (idToken != null) {

               String jwt = userService.loginUser(idToken);

               return ResponseEntity.ok(jwt);

            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUser(@RequestHeader("Authorization") String authorizationHeader) {
        // Checks if the header Authorization has the prefix "Bearer "
       if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

            String jwt = authorizationHeader.substring(7); // Remove prefix "Bearer " from the header to get the token);

           Optional<User> userOptional = userService.getUserFromJWT(jwt);
           // Unauthorized
           return userOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(401).build());
       } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/getUserNameAndImage")
    public ResponseEntity<UserNameAndImageDTO> getUserNameAndImage(@RequestHeader("Authorization") String authorizationHeader) {
        // Checks if the header Authorization has the prefix "Bearer "
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

            String jwt = authorizationHeader.substring(7); // Remove prefix "Bearer " from the header to get the token);

            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if(userOptional.isPresent()) {
                UserNameAndImageDTO userNameAndImageDTO = new UserNameAndImageDTO(userOptional.get());
                return ResponseEntity.ok(userNameAndImageDTO);
            }
            else{
                return ResponseEntity.status(401).build(); // Unauthorized
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/getUserNameAndTodayRoutineName")
    public ResponseEntity<?> getUserNameAndTodayRoutineName(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if(userOptional.isPresent()) {
                UserNameAndTodayRutineNameDTO userNameAndTodayRutineNameDTO = userService.getUserNameAndTodayRoutineName(userOptional.get());
                return ResponseEntity.ok(userNameAndTodayRutineNameDTO);
            }
            else{
                return ResponseEntity.status(401).body("Invalid token");
            }
        }
        else{
            return ResponseEntity.status(401).body("Token not found");
        }
    }

    @GetMapping("/getUserCount")
    public ResponseEntity<Long> getUserCount() {
        return ResponseEntity.ok(userService.getUserCount());
    }

    @PostMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String authorizationHeader, @RequestBody UpdateUserInfoDTO userChanges) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            Optional<User> userUpdated = userService.updateUser(jwt, userChanges);
            return userUpdated.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(401).build());
        }
        return ResponseEntity.status(401).body("Token not found");
    }

    @GetMapping("/validateToken")
    public ResponseEntity<Boolean> validateToken(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            Optional<User> userOptional = userService.getUserFromJWT(jwt);
            if(userOptional.isPresent()) {
                return ResponseEntity.ok(true);
            }
        }
        return ResponseEntity.ok(false);
    }

}
