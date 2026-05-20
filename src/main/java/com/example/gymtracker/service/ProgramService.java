package com.example.gymtracker.service;

import com.example.gymtracker.dto.*;
import com.example.gymtracker.models.*;
import com.example.gymtracker.repository.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class ProgramService {

    private final WorkoutProgramRepository programRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;

    @Transactional
    public ProgramResponseDto createProgram(UUID userId, CreateProgramRequestDto requestDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        WorkoutProgram program = new WorkoutProgram();
        program.setName(requestDto.getName());
        program.setUser(user);
        program.setActive(true);

        List<WorkoutDay> workoutDays = new ArrayList<>();
        for (WorkoutDayDto dayDto : requestDto.getWorkoutDays()) {
            WorkoutDay workoutDay = new WorkoutDay();
            workoutDay.setName(dayDto.getName());
            workoutDay.setDayOfWeek(dayDto.getDayOfWeek());
            workoutDay.setProgram(program);

            List<ProgramExercise> exercises = new ArrayList<>();
            for (ProgramExerciseDto exerciseDto : dayDto.getExercises()) {
                Exercise exercise = exerciseRepository.findByName(exerciseDto.getExerciseName())
                        .orElseGet(() -> {
                            Exercise newExercise = new Exercise();
                            newExercise.setName(exerciseDto.getExerciseName());
                            newExercise.setMuscleGroup(exerciseDto.getMuscleGroup());
                            return exerciseRepository.save(newExercise);
                        });

                ProgramExercise programExercise = new ProgramExercise();
                programExercise.setExercise(exercise);
                programExercise.setWorkoutDay(workoutDay);
                programExercise.setTargetSets(exerciseDto.getTargetSets());
                programExercise.setTargetReps(exerciseDto.getTargetReps());
                exercises.add(programExercise);
            }

            workoutDay.setExercises(exercises);
            workoutDays.add(workoutDay);
        }

        program.setWorkoutDays(workoutDays);
        return toResponseDto(programRepository.save(program));
    }

    public List<ProgramResponseDto> getUserPrograms(UUID userId) {
        return programRepository.findAll().stream()
                .filter(p -> p.getUser().getId().equals(userId))
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    public TodayWorkoutResponseDto getTodayWorkout(UUID userId) {
        DayOfWeek today = getCurrentDayOfWeek();

        List<WorkoutProgram> activePrograms = programRepository.findActiveProgramsWithDayOfWeek(userId, today);

        List<TodayExerciseDto> exercises = new ArrayList<>();
        for (WorkoutProgram program : activePrograms) {
            for (WorkoutDay day : program.getWorkoutDays()) {
                if (day.getDayOfWeek() == today) {
                    for (ProgramExercise pe : day.getExercises()) {
                        TodayExerciseDto dto = new TodayExerciseDto();
                        dto.setProgramId(program.getId());
                        dto.setProgramName(program.getName());
                        dto.setExerciseName(pe.getExercise().getName());
                        dto.setMuscleGroup(pe.getExercise().getMuscleGroup());
                        dto.setTargetSets(pe.getTargetSets());
                        dto.setTargetReps(pe.getTargetReps());
                        exercises.add(dto);
                    }
                }
            }
        }

        TodayWorkoutResponseDto response = new TodayWorkoutResponseDto();
        response.setDayOfWeek(today);
        response.setExercises(exercises);
        return response;
    }

    private DayOfWeek getCurrentDayOfWeek() {
        java.time.DayOfWeek javaDay = java.time.LocalDate.now().getDayOfWeek();
        return switch (javaDay) {
            case MONDAY -> DayOfWeek.MONDAY;
            case TUESDAY -> DayOfWeek.TUESDAY;
            case WEDNESDAY -> DayOfWeek.WEDNESDAY;
            case THURSDAY -> DayOfWeek.THURSDAY;
            case FRIDAY -> DayOfWeek.FRIDAY;
            case SATURDAY -> DayOfWeek.SATURDAY;
            case SUNDAY -> DayOfWeek.SUNDAY;
        };
    }

    private ProgramResponseDto toResponseDto(WorkoutProgram program) {
        ProgramResponseDto dto = new ProgramResponseDto();
        dto.setId(program.getId());
        dto.setName(program.getName());
        dto.setActive(program.isActive());

        List<WorkoutDayResponseDto> dayDtos = new ArrayList<>();
        for (WorkoutDay day : program.getWorkoutDays()) {
            WorkoutDayResponseDto dayDto = new WorkoutDayResponseDto();
            dayDto.setName(day.getName());
            dayDto.setDayOfWeek(day.getDayOfWeek());

            List<ProgramExerciseResponseDto> exerciseDtos = new ArrayList<>();
            for (ProgramExercise pe : day.getExercises()) {
                ProgramExerciseResponseDto exerciseDto = new ProgramExerciseResponseDto();
                exerciseDto.setExerciseName(pe.getExercise().getName());
                exerciseDto.setMuscleGroup(pe.getExercise().getMuscleGroup());
                exerciseDto.setTargetSets(pe.getTargetSets());
                exerciseDto.setTargetReps(pe.getTargetReps());
                exerciseDtos.add(exerciseDto);
            }
            dayDto.setExercises(exerciseDtos);
            dayDtos.add(dayDto);
        }
        dto.setWorkoutDays(dayDtos);
        return dto;
    }
}