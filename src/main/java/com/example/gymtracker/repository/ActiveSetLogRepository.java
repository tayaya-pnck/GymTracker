package com.example.gymtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.gymtracker.models.ActiveSetLog;
import java.util.UUID;

@Repository
public interface ActiveSetLogRepository extends JpaRepository<ActiveSetLog, UUID> {
}