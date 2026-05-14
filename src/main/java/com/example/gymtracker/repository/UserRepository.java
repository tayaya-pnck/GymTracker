package com.example.gymtracker.repository;
import com.example.gymtracker.models.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
//    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email); //for searching the email
    boolean existsByEmail(String email); // use in register so no double regis
    boolean existsByUsername(String username); // check the Uname to make sure no one else uses it

}