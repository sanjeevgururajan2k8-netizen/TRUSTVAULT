package com.example.demo.repository;

import com.example.demo.entity.CustodyLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustodyLogRepository extends JpaRepository<CustodyLog, Long> {
    List<CustodyLog> findByEvidenceIdOrderByTimestampAsc(String evidenceId);
}
