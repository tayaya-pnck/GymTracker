package com.example.gymtracker.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "active_set_logs")
public class ActiveSetLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private ActiveWorkoutSession session;

    @Column(nullable = false)
    private int setNumber;

    @Column(nullable = false)
    private int targetReps;

    @Column(nullable = false)
    private int actualReps;

    @Column(nullable = false)
    private double targetWeight;

    @Column(nullable = false)
    private double actualWeight;

    @Column(nullable = false)
    private Instant loggedAt;
}