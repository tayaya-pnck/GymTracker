package com.example.gymtracker.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LogSetRequestDto {

    @NotNull(message = "set number is required")
    @Positive(message = "set number must be positive")
    private int setNumber;

    @NotNull(message = "target reps is required")
    @Min(value = 1, message = "target reps must be at least 1")
    private int targetReps;

    @NotNull(message = "actual reps is required")
    @Min(value = 0, message = "actual reps cannot be negative")
    private int actualReps;

    @NotNull(message = "target weight is required")
    @Positive(message = "target weight must be positive")
    private double targetWeight;

    @NotNull(message = "actual weight is required")
    @Positive(message = "actual weight must be positive")
    private double actualWeight;
}