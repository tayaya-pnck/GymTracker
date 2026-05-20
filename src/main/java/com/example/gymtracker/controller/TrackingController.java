package com.example.gymtracker.controller;

import com.example.gymtracker.dto.*;
import com.example.gymtracker.models.User;
import com.example.gymtracker.service.TrackingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tracking")
@RequiredArgsConstructor
public class TrackingController {

    private final TrackingService trackingService;

    @PostMapping("/start")
    public ResponseEntity<SessionResponseDto> startSession(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody StartSessionRequestDto requestDto) {
        SessionResponseDto response = trackingService.startSession(currentUser.getId(), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/set")
    public ResponseEntity<SetLogResponseDto> logSet(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody LogSetRequestDto requestDto) {
        SetLogResponseDto response = trackingService.logSet(currentUser.getId(), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/end")
    public ResponseEntity<SessionResponseDto> endSession(
            @AuthenticationPrincipal User currentUser) {
        SessionResponseDto response = trackingService.endSession(currentUser.getId());
        return ResponseEntity.ok(response);
    }
}