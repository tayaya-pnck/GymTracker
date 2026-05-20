package com.example.gymtracker.dto;

import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SetLogResponseDto {
    private UUID id;
    private int setNumber;
    private int targetReps;
    private int actualReps;
    private double targetWeight;
    private double actualWeight;
    private Instant loggedAt;
}