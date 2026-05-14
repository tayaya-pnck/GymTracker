package com.example.gymtracker.controller;
import com.example.gymtracker.dto.WorkoutLogRequestDto;
import com.example.gymtracker.models.User;
import com.example.gymtracker.models.WorkoutLog;
import com.example.gymtracker.service.WorkoutService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/workouts")
@RequiredArgsConstructor
public class WorkoutController {
    private final WorkoutService workoutService;

    //LOG A NEW SET
//    @PostMapping
//    public ResponseEntity<WorkoutLog> logSet(
//            @AuthenticationPrincipal User currentUser,
//            @RequestBody WorkoutLog incomingSet){
//        WorkoutLog savedSet = workoutService.logNewSet(currentUser.getId(), incomingSet);
//        return ResponseEntity.ok(savedSet);
//    }

    @PostMapping
    public ResponseEntity<WorkoutLog> logNewSet(
            @AuthenticationPrincipal User currentUser,
            @RequestBody WorkoutLogRequestDto incomingSet){
        WorkoutLog savedSet = workoutService.logNewSet(currentUser.getId(), incomingSet);
        return ResponseEntity.ok(savedSet);
    }

    @GetMapping("/today")
    public ResponseEntity<List<WorkoutLog>> getTodayWorkouts(
            @AuthenticationPrincipal User currentUser){
        LocalDateTime StartofDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime EndofDay = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

        List<WorkoutLog> todaysLog = workoutService.getWorkoutHistory(
                currentUser.getId(), StartofDay, EndofDay);
        return   ResponseEntity.ok(todaysLog);
    }
}
