package com.example.gymtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.gymtracker.models.ActiveWorkoutSession;
import com.example.gymtracker.models.SessionStatus;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ActiveWorkoutSessionRepository extends JpaRepository<ActiveWorkoutSession, UUID> {

    Optional<ActiveWorkoutSession> findByUserIdAndStatus(UUID userId, SessionStatus status);
}