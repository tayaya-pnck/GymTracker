package com.example.gymtracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProgramExerciseDto {

    @NotBlank(message = "exercise name is required")
    private String exerciseName;

    @NotNull(message = "muscle group is required")
    private com.example.gymtracker.models.MuscleGroup muscleGroup;

    @Positive(message = "target sets must be positive")
    private int targetSets;

    @Positive(message = "target reps must be positive")
    private int targetReps;
}