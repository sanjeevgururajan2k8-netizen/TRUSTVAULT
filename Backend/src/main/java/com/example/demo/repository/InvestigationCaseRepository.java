package com.example.demo.repository;

import com.example.demo.entity.InvestigationCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvestigationCaseRepository extends JpaRepository<InvestigationCase, String> {
    List<InvestigationCase> findByInvestigatorId(String investigatorId);
}
