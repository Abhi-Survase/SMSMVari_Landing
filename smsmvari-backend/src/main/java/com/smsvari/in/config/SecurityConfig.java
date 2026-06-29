package com.smsvari.in.config;

import com.smsvari.in.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // CORS for browser
                .cors(cors -> cors.configurationSource(corsConfigurationSource))

                // disable CSRF (JWT stateless)
                .csrf(AbstractHttpConfigurer::disable)

                // no session (JWT only)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth

                        // allow preflight request
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // public auth APIs
                        .requestMatchers("/api/v1/auth/**").permitAll()

                        // public event read APIs (used by customer-facing UI, no login required)
                        // covers /api/events, /api/events/{slug}, /api/events/categories, etc.
                        .requestMatchers(HttpMethod.GET, "/api/events/**").permitAll()

                        // public gallery read APIs (used by customer-facing UI, no login required)
                        .requestMatchers(HttpMethod.GET, "/api/gallery/**").permitAll()

                        // static image/thumbnail files served from disk
                        .requestMatchers(HttpMethod.GET, "/gallery/**").permitAll()

                        // everything else secured (admin endpoints etc.)
                        .anyRequest().authenticated()
                )
                // JWT filter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}