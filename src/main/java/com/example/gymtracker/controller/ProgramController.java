package com.example.gymtracker.controller;

import com.example.gymtracker.dto.*;
import com.example.gymtracker.models.User;
import com.example.gymtracker.service.ProgramService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/programs")
@RequiredArgsConstructor
public class ProgramController {

    private final ProgramService programService;

    @PostMapping
    public ResponseEntity<ProgramResponseDto> createProgram(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody CreateProgramRequestDto requestDto) {
        ProgramResponseDto response = programService.createProgram(currentUser.getId(), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ProgramResponseDto>> getUserPrograms(
            @AuthenticationPrincipal User currentUser) {
        List<ProgramResponseDto> programs = programService.getUserPrograms(currentUser.getId());
        return ResponseEntity.ok(programs);
    }

    @GetMapping("/today")
    public ResponseEntity<TodayWorkoutResponseDto> getTodayWorkout(
            @AuthenticationPrincipal User currentUser) {
        TodayWorkoutResponseDto response = programService.getTodayWorkout(currentUser.getId());
        return ResponseEntity.ok(response);
    }
}