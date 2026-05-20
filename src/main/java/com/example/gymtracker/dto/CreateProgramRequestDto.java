package com.example.gymtracker.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CreateProgramRequestDto {

    @NotBlank(message = "program name is required")
    private String name;

    @Valid
    @NotNull(message = "workout days are required")
    private List<WorkoutDayDto> workoutDays;
}