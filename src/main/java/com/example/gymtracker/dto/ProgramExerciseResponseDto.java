package com.example.gymtracker.dto;

import com.example.gymtracker.models.MuscleGroup;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProgramExerciseResponseDto {
    private String exerciseName;
    private MuscleGroup muscleGroup;
    private int targetSets;
    private int targetReps;
}