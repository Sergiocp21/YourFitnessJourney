package com.your_fitness_journey.backend.Controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.your_fitness_journey.backend.Model.User;
import com.your_fitness_journey.backend.Model.UserNameAndImageDTO;
import com.your_fitness_journey.backend.Service.UserService;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/backend")
public class UserController {

    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    public static final Dotenv env = Dotenv.load();

    private final String CLIENT_ID = env.get("CLIENT_ID");

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

    @PostMapping("/updateUser")
    public ResponseEntity<User> updateUser(@RequestHeader("Authorization") String authorizationHeader, @RequestBody User userChanges) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            Optional<User> userUpdated = userService.UpdateUser(jwt, userChanges);
            return userUpdated.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(401).build());
        }
        return ResponseEntity.badRequest().build();

    }

}
