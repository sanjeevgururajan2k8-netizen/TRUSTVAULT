package com.example.demo.repository;

import com.example.demo.entity.FIR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FIRRepository extends JpaRepository<FIR, String> {
    Optional<FIR> findByCaseId(String caseId);
}
