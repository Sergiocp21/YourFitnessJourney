package com.your_fitness_journey.backend.Security;

import com.your_fitness_journey.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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

    private final UserService userService;

    @Autowired
    public SecurityConfig(UserService userService) {
        this.userService = userService;
    }

    /**
     * Configura un filtro CORS global para la aplicación.
     * Este bean se encargará de añadir los encabezados CORS necesarios
     * a todas las respuestas del backend.
     */
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        // Lista de orígenes permitidos. Asegúrate de que coincida exactamente con el dominio de tu frontend.
        config.setAllowedOrigins(List.of("http://localhost:5173", "https://yourfitnessjourney.fit"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*")); // Permite todos los encabezados
        source.registerCorsConfiguration("/**", config); // Aplica esta configuración a todas las rutas
        return new CorsFilter(source);
    }

    /**
     * Configura la cadena de filtros de seguridad HTTP para la aplicación.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) // Deshabilita CSRF, común para APIs REST sin sesiones basadas en cookies
                // Aplica la configuración CORS usando el CorsFilter definido.
                // Spring Security detectará el bean CorsFilter y lo usará automáticamente.
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration corsConfig = new CorsConfiguration();
                    corsConfig.setAllowedOrigins(List.of("http://localhost:5173", "https://yourfitnessjourney.fit"));
                    corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    corsConfig.setAllowedHeaders(List.of("*"));
                    corsConfig.setAllowCredentials(true);
                    return corsConfig;
                }))
                .authorizeHttpRequests(auth -> auth
                        // Permite el acceso sin autenticación a tus endpoints de acceso y conteo de usuarios.
                        // Ajusta estas rutas para que coincidan exactamente con tus endpoints.
                        // Por ejemplo, si tienes "/users/access" y "/users/getUserCount".
                        .requestMatchers("/users/access", "/users/getUserCount").permitAll()
                        // Cualquier otra solicitud requiere autenticación.
                        .anyRequest().authenticated()
                )
                .build();
    }
}