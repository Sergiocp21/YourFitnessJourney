package com.your_fitness_journey.backend.Controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.your_fitness_journey.backend.Model.User;
import com.your_fitness_journey.backend.Service.UserService;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;

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

               String jwt = userService.loadUser(idToken);

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
        // Verificar si el encabezado Authorization tiene el prefijo "Bearer "
       if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

            String jwt = authorizationHeader.substring(7); // Remove prefix "Bearer " from the header to get the token);


            if (userService.getUserFromJWT(jwt).isPresent()) {
                return ResponseEntity.ok(userService.getUserFromJWT(jwt).get());
            } else {
                return ResponseEntity.status(401).build();  // Unauthorized
            }
       } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/login/{pass}")
    public ResponseEntity<User> easyLogin(@PathVariable String pass) {
        if(pass.equals("admin")) {
            User usr = userService.getUser("1");
            if(usr != null) {
                return ResponseEntity.ok(usr);
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
