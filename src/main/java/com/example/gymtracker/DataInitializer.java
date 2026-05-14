package com.example.gymtracker;
import com.example.gymtracker.repository.UserRepository;
import com.example.gymtracker.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Create a test user only if one doesn't exist
        Optional<User> existingUser = userRepository.findByEmail("test@example.com");

        if (existingUser.isEmpty()) {
            User testUser = User.builder()
                    .email("test@example.com")
                    .password("securepassword") // We'll hash this later!
                    .fullName("Test User")
                    .displayName("Test User")
                    .build();

            User savedUser = userRepository.save(testUser);
            System.out.println("✅ Test User Created with ID: " + savedUser.getId());
        }
    }
}