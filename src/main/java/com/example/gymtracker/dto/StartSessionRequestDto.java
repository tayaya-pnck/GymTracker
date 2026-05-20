package com.example.gymtracker.dto;

import com.example.gymtracker.models.MuscleGroup;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StartSessionRequestDto {

    @NotBlank(message = "exercise name is required")
    private String exerciseName;

    @NotNull(message = "muscle group is required")
    private MuscleGroup muscleGroup;
}