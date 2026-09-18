package com.example.demo.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "investigation_cases")
public class InvestigationCase {

    @Id
    private String id;
    private String caseNumber;
    private String title;
    private String incidentDate;
    private String incidentLocation;
    private String priority;
    private String status;
    private String investigatorId;
    private LocalDateTime createdDate;
    private LocalDateTime lastUpdated;
    
    @Column(length = 2000)
    private String description;
    
    @Column(length = 2000)
    private String notes;

    @ElementCollection
    private List<String> evidenceIds;

    private String firId;

    @ElementCollection
    private List<String> witnessIds;

    @ElementCollection
    private List<String> forensicReportIds;

    private boolean submittedToCourt;
    private LocalDateTime courtSubmissionDate;

    // A simple way to map progress is just fields
    private boolean caseCreatedProgress;
    private boolean firAddedProgress;
    private boolean evidenceCollectedProgress;
    private boolean forensicExaminationProgress;
    private boolean forensicReportProgress;
    private boolean courtSubmissionProgress;

    public InvestigationCase() {
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCaseNumber() {
        return caseNumber;
    }

    public void setCaseNumber(String caseNumber) {
        this.caseNumber = caseNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIncidentDate() {
        return incidentDate;
    }

    public void setIncidentDate(String incidentDate) {
        this.incidentDate = incidentDate;
    }

    public String getIncidentLocation() {
        return incidentLocation;
    }

    public void setIncidentLocation(String incidentLocation) {
        this.incidentLocation = incidentLocation;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getInvestigatorId() {
        return investigatorId;
    }

    public void setInvestigatorId(String investigatorId) {
        this.investigatorId = investigatorId;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<String> getEvidenceIds() {
        return evidenceIds;
    }

    public void setEvidenceIds(List<String> evidenceIds) {
        this.evidenceIds = evidenceIds;
    }

    public String getFirId() {
        return firId;
    }

    public void setFirId(String firId) {
        this.firId = firId;
    }

    public List<String> getWitnessIds() {
        return witnessIds;
    }

    public void setWitnessIds(List<String> witnessIds) {
        this.witnessIds = witnessIds;
    }

    public List<String> getForensicReportIds() {
        return forensicReportIds;
    }

    public void setForensicReportIds(List<String> forensicReportIds) {
        this.forensicReportIds = forensicReportIds;
    }

    public boolean isSubmittedToCourt() {
        return submittedToCourt;
    }

    public void setSubmittedToCourt(boolean submittedToCourt) {
        this.submittedToCourt = submittedToCourt;
    }

    public LocalDateTime getCourtSubmissionDate() {
        return courtSubmissionDate;
    }

    public void setCourtSubmissionDate(LocalDateTime courtSubmissionDate) {
        this.courtSubmissionDate = courtSubmissionDate;
    }

    public boolean isCaseCreatedProgress() {
        return caseCreatedProgress;
    }

    public void setCaseCreatedProgress(boolean caseCreatedProgress) {
        this.caseCreatedProgress = caseCreatedProgress;
    }

    public boolean isFirAddedProgress() {
        return firAddedProgress;
    }

    public void setFirAddedProgress(boolean firAddedProgress) {
        this.firAddedProgress = firAddedProgress;
    }

    public boolean isEvidenceCollectedProgress() {
        return evidenceCollectedProgress;
    }

    public void setEvidenceCollectedProgress(boolean evidenceCollectedProgress) {
        this.evidenceCollectedProgress = evidenceCollectedProgress;
    }

    public boolean isForensicExaminationProgress() {
        return forensicExaminationProgress;
    }

    public void setForensicExaminationProgress(boolean forensicExaminationProgress) {
        this.forensicExaminationProgress = forensicExaminationProgress;
    }

    public boolean isForensicReportProgress() {
        return forensicReportProgress;
    }

    public void setForensicReportProgress(boolean forensicReportProgress) {
        this.forensicReportProgress = forensicReportProgress;
    }

    public boolean isCourtSubmissionProgress() {
        return courtSubmissionProgress;
    }

    public void setCourtSubmissionProgress(boolean courtSubmissionProgress) {
        this.courtSubmissionProgress = courtSubmissionProgress;
    }
}
