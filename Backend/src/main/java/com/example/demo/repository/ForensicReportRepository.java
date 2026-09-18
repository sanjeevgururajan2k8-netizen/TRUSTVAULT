package com.example.demo.repository;

import com.example.demo.entity.ForensicReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForensicReportRepository extends JpaRepository<ForensicReport, String> {
    List<ForensicReport> findByCaseId(String caseId);
}
