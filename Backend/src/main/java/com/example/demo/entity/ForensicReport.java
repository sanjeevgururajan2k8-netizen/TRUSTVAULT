package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Column;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "forensic_reports")
public class ForensicReport {

    @Id
    private String id;
    private String caseId;
    
    @ElementCollection
    private List<String> evidenceIds;
    
    private String examiner;
    private String examinerId;
    private LocalDateTime date;
    private String method;
    
    @Column(length = 2000)
    private String observations;
    
    @Column(length = 2000)
    private String findings;
    
    @Column(length = 2000)
    private String conclusion;
    
    private String status;
    
    @ElementCollection
    private List<String> supportingFiles;

    public ForensicReport() {
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

    public List<String> getEvidenceIds() {
        return evidenceIds;
    }

    public void setEvidenceIds(List<String> evidenceIds) {
        this.evidenceIds = evidenceIds;
    }

    public String getExaminer() {
        return examiner;
    }

    public void setExaminer(String examiner) {
        this.examiner = examiner;
    }

    public String getExaminerId() {
        return examinerId;
    }

    public void setExaminerId(String examinerId) {
        this.examinerId = examinerId;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public String getFindings() {
        return findings;
    }

    public void setFindings(String findings) {
        this.findings = findings;
    }

    public String getConclusion() {
        return conclusion;
    }

    public void setConclusion(String conclusion) {
        this.conclusion = conclusion;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getSupportingFiles() {
        return supportingFiles;
    }

    public void setSupportingFiles(List<String> supportingFiles) {
        this.supportingFiles = supportingFiles;
    }
}
