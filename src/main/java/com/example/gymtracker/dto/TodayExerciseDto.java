package com.example.gymtracker.dto;

import com.example.gymtracker.models.MuscleGroup;
import lombok.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TodayExerciseDto {
    private UUID programId;
    private String programName;
    private String exerciseName;
    private MuscleGroup muscleGroup;
    private int targetSets;
    private int targetReps;
}