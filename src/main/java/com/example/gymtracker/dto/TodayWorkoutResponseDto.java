package com.example.gymtracker.dto;

import com.example.gymtracker.models.DayOfWeek;
import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TodayWorkoutResponseDto {
    private DayOfWeek dayOfWeek;
    private List<TodayExerciseDto> exercises;
}