package com.example.gymtracker.service;


import com.example.gymtracker.dto.WorkoutLogRequestDto;
import com.example.gymtracker.models.WorkoutLog;
import com.example.gymtracker.repository.UserRepository;
import com.example.gymtracker.repository.WorkoutRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;

    @Transactional
    public void save(WorkoutLog workoutLog) {}

    public WorkoutLog logNewSet(
            UUID userId,
            WorkoutLogRequestDto requestDto){

        if (requestDto.getWeight() < 0 || requestDto.getReps() <= 0) {
            throw new IllegalArgumentException("Weight and reps must be positive numbers!");
        }
//        requestDto.setUserId(userId);
        WorkoutLog newSet = new WorkoutLog();
        newSet.setUserId(userId);
        newSet.setExerciseName(requestDto.getExerciseName());
        newSet.setMuscleGroup(requestDto.getMuscleGroup());
        newSet.setSetNumber(requestDto.getSetNumber());
        newSet.setWeight(requestDto.getWeight());
        newSet.setReps(requestDto.getReps());

        Optional<WorkoutLog> historicalBest = workoutRepository
                .findTopByUserIdAndExerciseNameOrderByWeightDesc(userId, requestDto.getExerciseName());

        // Check if the new set is heavier than the historical best
        if (historicalBest.isEmpty() || requestDto.getWeight() > historicalBest.get().getWeight()) {
            // It's a new PR! You could set a boolean here like `requestDto.setPersonalRecord(true);`
            System.out.println("NEW PR ALERT FOR: " + requestDto.getExerciseName());
        }
        return workoutRepository.save(newSet);
    }

//    public WorkoutLog getWorkoutHistory(UUID userId, LocalDateTime StartofDay, LocalDateTime EndofDay) {
//        List<WorkoutLog> workoutHistory = workoutRepository
//                .findByUserIdAndLoggedAtBetween(userId, StartofDay, EndofDay);
//        return workoutHistory.getFirst();
//    }
    public List<WorkoutLog> getWorkoutHistory(UUID userId, LocalDateTime start, LocalDateTime end) {
        return getWorkoutRepository().findByUserIdAndLoggedAtBetween(userId, start, end);

        //pembelajaran klo mau return THE entire List, bisa langsung pas return
    }

}
