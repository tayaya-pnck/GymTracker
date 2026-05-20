package com.example.gymtracker.dto;

import com.example.gymtracker.models.DayOfWeek;
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
public class WorkoutDayDto {

    @NotBlank(message = "day name is required")
    private String name;

    @NotNull(message = "day of week is required")
    private DayOfWeek dayOfWeek;

    @Valid
    private List<ProgramExerciseDto> exercises;
}