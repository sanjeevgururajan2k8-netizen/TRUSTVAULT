package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.time.LocalDate;

@Entity
@Table(name = "witnesses")
public class Witness {

    @Id
    private String id;
    private String caseId;
    private String name;
    private String role;
    private LocalDate statementDate;
    private String status;
    private boolean summaryAvailable;
    
    @Column(length = 2000)
    private String statementText;

    public Witness() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCaseId() {
        return caseId;
    }

    public void setCaseId(String caseId) {
        this.caseId = caseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDate getStatementDate() {
        return statementDate;
    }

    public void setStatementDate(LocalDate statementDate) {
        this.statementDate = statementDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isSummaryAvailable() {
        return summaryAvailable;
    }

    public void setSummaryAvailable(boolean summaryAvailable) {
        this.summaryAvailable = summaryAvailable;
    }

    public String getStatementText() {
        return statementText;
    }

    public void setStatementText(String statementText) {
        this.statementText = statementText;
    }
}
