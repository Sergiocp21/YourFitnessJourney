package com.your_fitness_journey.backend.Security.JWT;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
public class JwtConfig {
    private static final Dotenv env = Dotenv.load();
    @Value("${JWT_SECRET}")
    private String secret;

    @Value("${JWT_EXPIRATION}")
    private long expiration;

    private String clientId;

    private String clientSecret;

    public String getSecret() {
        return secret;
    }

    public long getExpiration() {
        return expiration;
    }
}
