package com.example.gymtracker.dto;

import com.example.gymtracker.models.DayOfWeek;
import lombok.*;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProgramResponseDto {
    private UUID id;
    private String name;
    private boolean isActive;
    private List<WorkoutDayResponseDto> workoutDays;
}