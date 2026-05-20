package com.example.gymtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.gymtracker.models.ProgramExercise;
import java.util.UUID;

@Repository
public interface ProgramExerciseRepository extends JpaRepository<ProgramExercise, UUID> {
}