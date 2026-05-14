package com.example.gymtracker.dto;

import com.example.gymtracker.models.MuscleGroup;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class WorkoutLogRequestDto {

    @NotNull (message = "exercise name is required")
    private String exerciseName;

    @NotNull (message = "muscle group type is required!")
    private MuscleGroup muscleGroup;

    @NotNull(message = "how many reps")
    private int reps;

    @NotNull (message = "how many sets per reps")
    private int setNumber;

    @NotNull(message = "how heavy the load is")
    private double weight;

}
