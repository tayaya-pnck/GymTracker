package com.example.gymtracker.dto;

import com.example.gymtracker.models.MuscleGroup;
import com.example.gymtracker.models.SessionStatus;
import lombok.*;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SessionResponseDto {
    private UUID sessionId;
    private String exerciseName;
    private MuscleGroup muscleGroup;
    private Instant startTime;
    private Instant endTime;
    private SessionStatus status;
    private Duration totalDuration;
    private List<SetLogResponseDto> setLogs;
}