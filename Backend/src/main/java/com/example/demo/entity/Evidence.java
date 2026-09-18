package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.time.LocalDateTime;

@Entity
@Table(name = "evidence")
public class Evidence {

    @Id
    private String id;
    private String caseId;
    private String name;
    private String type;
    private String fileName;
    private String fileSize;
    private String uploadedBy;
    private LocalDateTime uploadDate;
    private String hashOriginal;
    private String hashCurrent;
    private String integrityStatus;
    private LocalDateTime lastVerified;
    private String status;
    private String currentHolder;

    @Column(length = 2000)
    private String examinationData; // JSON or stringified data

    public Evidence() {
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileSize() {
        return fileSize;
    }

    public void setFileSize(String fileSize) {
        this.fileSize = fileSize;
    }

    public String getUploadedBy() {
        return uploadedBy;
    }

    public void setUploadedBy(String uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    public LocalDateTime getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDateTime uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getHashOriginal() {
        return hashOriginal;
    }

    public void setHashOriginal(String hashOriginal) {
        this.hashOriginal = hashOriginal;
    }

    public String getHashCurrent() {
        return hashCurrent;
    }

    public void setHashCurrent(String hashCurrent) {
        this.hashCurrent = hashCurrent;
    }

    public String getIntegrityStatus() {
        return integrityStatus;
    }

    public void setIntegrityStatus(String integrityStatus) {
        this.integrityStatus = integrityStatus;
    }

    public LocalDateTime getLastVerified() {
        return lastVerified;
    }

    public void setLastVerified(LocalDateTime lastVerified) {
        this.lastVerified = lastVerified;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCurrentHolder() {
        return currentHolder;
    }

    public void setCurrentHolder(String currentHolder) {
        this.currentHolder = currentHolder;
    }

    public String getExaminationData() {
        return examinationData;
    }

    public void setExaminationData(String examinationData) {
        this.examinationData = examinationData;
    }
}
