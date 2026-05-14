package com.example.gymtracker.repository;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.gymtracker.models.WorkoutLog;
import com.example.gymtracker.models.MuscleGroup;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WorkoutRepository extends JpaRepository<WorkoutLog, UUID> {

    List<WorkoutLog> findByUserIdAndLoggedAtBetween(UUID userId, LocalDateTime startOfDay, LocalDateTime endOfDay);
    List<WorkoutLog> findByUserIdAndMuscleGroup(UUID userId, MuscleGroup muscleGroup);
    Optional<WorkoutLog> findTopByUserIdAndExerciseNameOrderByWeightDesc(UUID uuid, String exerciseName);

    @Query("SELECT SUM(w.weight * w.reps) FROM WorkoutLog w WHERE w.userId = :userId AND w.muscleGroup = :muscleGroup AND w.loggedAt >= :sinceDate")
    Double calculateTotalVolume(
            @Param("userId") UUID userId,
            @Param("muscleGroup") MuscleGroup muscleGroup,
            @Param("sinceDate") LocalDateTime sinceDate
    );
}
