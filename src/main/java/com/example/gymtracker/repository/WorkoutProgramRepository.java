package com.example.gymtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.gymtracker.models.WorkoutProgram;
import com.example.gymtracker.models.WorkoutDay;
import com.example.gymtracker.models.DayOfWeek;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WorkoutProgramRepository extends JpaRepository<WorkoutProgram, UUID> {

    List<WorkoutProgram> findByUserIdAndActiveTrue(UUID userId);

    @Query("SELECT wp FROM WorkoutProgram wp " +
           "JOIN wp.workoutDays wd " +
           "WHERE wp.user.id = :userId " +
           "AND wp.active = true " +
           "AND wd.dayOfWeek = :dayOfWeek")
    List<WorkoutProgram> findActiveProgramsWithDayOfWeek(@Param("userId") UUID userId, @Param("dayOfWeek") DayOfWeek dayOfWeek);

    Optional<WorkoutProgram> findByIdAndUserId(UUID id, UUID userId);
}