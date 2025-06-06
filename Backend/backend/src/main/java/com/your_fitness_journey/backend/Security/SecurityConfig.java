package com.your_fitness_journey.backend.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // Este Bean CorsFilter es el que Spring Security detectará y usará
    // cuando llames a .cors(Customizer.withDefaults())
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of("http://localhost:5173", "https://yourfitnessjourney.fit"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        source.registerCorsConfiguration("/**", config); // Aplica esta configuración a todas las rutas
        return new CorsFilter(source);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // Habilita CORS usando el CorsFilter bean que hemos definido.
                // Spring Security detectará el bean CorsFilter y lo aplicará.
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable()) // Deshabilita CSRF, común para APIs REST sin sesiones basadas en cookies
                .authorizeHttpRequests(auth -> auth
                        // Permite el acceso sin autenticación a tus endpoints de acceso y conteo de usuarios.
                        .requestMatchers("/users/access", "/users/getUserCount").permitAll()
                        // Cualquier otra solicitud requiere autenticación.
                        .anyRequest().authenticated()
                )
                .build();
    }
}
