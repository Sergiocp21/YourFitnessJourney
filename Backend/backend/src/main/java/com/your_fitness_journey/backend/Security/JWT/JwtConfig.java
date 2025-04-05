package com.your_fitness_journey.backend.Security.JWT;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
public class JwtConfig {
    private static final Dotenv env = Dotenv.load();

    private String secret = env.get("JWT_SECRET_KEY");

    private long expiration =  Long.parseLong(env.get("JWT_EXPIRATION"));

    private String clientId;

    private String clientSecret;

    public String getSecret() {
        return secret;
    }

    public long getExpiration() {
        return expiration;
    }
}
