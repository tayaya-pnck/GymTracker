package com.example.gymtracker.service;

import com.example.gymtracker.dto.*;
import com.example.gymtracker.models.*;
import com.example.gymtracker.repository.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class TrackingService {

    private final ActiveWorkoutSessionRepository sessionRepository;
    private final ActiveSetLogRepository setLogRepository;
    private final UserRepository userRepository;

    @Transactional
    public SessionResponseDto startSession(UUID userId, StartSessionRequestDto requestDto) {
        sessionRepository.findByUserIdAndStatus(userId, SessionStatus.IN_PROGRESS)
                .ifPresent(session -> {
                    throw new IllegalStateException("A workout session is already in progress");
                });

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        ActiveWorkoutSession session = new ActiveWorkoutSession();
        session.setUser(user);
        session.setExerciseName(requestDto.getExerciseName());
        session.setMuscleGroup(requestDto.getMuscleGroup());
        session.setStartTime(Instant.now());
        session.setStatus(SessionStatus.IN_PROGRESS);

        session = sessionRepository.save(session);
        return toResponseDto(session);
    }

    @Transactional
    public SetLogResponseDto logSet(UUID userId, LogSetRequestDto requestDto) {
        ActiveWorkoutSession session = sessionRepository.findByUserIdAndStatus(userId, SessionStatus.IN_PROGRESS)
                .orElseThrow(() -> new IllegalStateException("No active workout session found"));

        ActiveSetLog setLog = new ActiveSetLog();
        setLog.setSession(session);
        setLog.setSetNumber(requestDto.getSetNumber());
        setLog.setTargetReps(requestDto.getTargetReps());
        setLog.setActualReps(requestDto.getActualReps());
        setLog.setTargetWeight(requestDto.getTargetWeight());
        setLog.setActualWeight(requestDto.getActualWeight());
        setLog.setLoggedAt(Instant.now());

        setLog = setLogRepository.save(setLog);
        return toSetLogResponseDto(setLog);
    }

    @Transactional
    public SessionResponseDto endSession(UUID userId) {
        ActiveWorkoutSession session = sessionRepository.findByUserIdAndStatus(userId, SessionStatus.IN_PROGRESS)
                .orElseThrow(() -> new IllegalStateException("No active workout session found"));

        session.setEndTime(Instant.now());
        session.setStatus(SessionStatus.COMPLETED);

        session = sessionRepository.save(session);
        return toResponseDto(session);
    }

    private SessionResponseDto toResponseDto(ActiveWorkoutSession session) {
        SessionResponseDto dto = new SessionResponseDto();
        dto.setSessionId(session.getId());
        dto.setExerciseName(session.getExerciseName());
        dto.setMuscleGroup(session.getMuscleGroup());
        dto.setStartTime(session.getStartTime());
        dto.setEndTime(session.getEndTime());
        dto.setStatus(session.getStatus());

        if (session.getEndTime() != null) {
            dto.setTotalDuration(Duration.between(session.getStartTime(), session.getEndTime()));
        }

        List<SetLogResponseDto> setLogs = new ArrayList<>();
        for (ActiveSetLog log : session.getSetLogs()) {
            setLogs.add(toSetLogResponseDto(log));
        }
        dto.setSetLogs(setLogs);

        return dto;
    }

    private SetLogResponseDto toSetLogResponseDto(ActiveSetLog setLog) {
        SetLogResponseDto dto = new SetLogResponseDto();
        dto.setId(setLog.getId());
        dto.setSetNumber(setLog.getSetNumber());
        dto.setTargetReps(setLog.getTargetReps());
        dto.setActualReps(setLog.getActualReps());
        dto.setTargetWeight(setLog.getTargetWeight());
        dto.setActualWeight(setLog.getActualWeight());
        dto.setLoggedAt(setLog.getLoggedAt());
        return dto;
    }
}