package com.example.demo.service;

import com.example.demo.entity.CustodyLog;
import com.example.demo.entity.Evidence;
import com.example.demo.repository.CustodyLogRepository;
import com.example.demo.repository.EvidenceRepository;
import com.example.demo.repository.InvestigationCaseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class EvidenceService {

    private final EvidenceRepository evidenceRepository;
    private final CustodyLogRepository custodyLogRepository;
    private final InvestigationCaseRepository caseRepository;
    private final AuditLogService auditLogService;

    public EvidenceService(EvidenceRepository evidenceRepository,
                           CustodyLogRepository custodyLogRepository,
                           InvestigationCaseRepository caseRepository,
                           AuditLogService auditLogService) {
        this.evidenceRepository = evidenceRepository;
        this.custodyLogRepository = custodyLogRepository;
        this.caseRepository = caseRepository;
        this.auditLogService = auditLogService;
    }

    public List<Evidence> getAllEvidence() {
        return evidenceRepository.findAll();
    }

    public Optional<Evidence> getEvidenceById(String id) {
        return evidenceRepository.findById(id);
    }

    public List<Evidence> getEvidenceByCase(String caseId) {
        return evidenceRepository.findByCaseId(caseId);
    }

    public List<Evidence> getForensicWorkQueue() {
        List<String> statuses = Arrays.asList(
                "Sent to Forensic", "Received", "Under Examination",
                "Examination Completed", "Report Submitted");
        return evidenceRepository.findByStatusIn(statuses);
    }

    public Evidence addEvidence(String caseId, Evidence evidence, String actorName, String actorRole) {
        long count = evidenceRepository.count();
        String id = String.format("EV-%04d", 1000 + count + 1);
        evidence.setId(id);
        evidence.setCaseId(caseId);
        LocalDateTime now = LocalDateTime.now();
        evidence.setUploadDate(now);
        evidence.setIntegrityStatus("verified");
        evidence.setLastVerified(now);
        evidence.setStatus("Uploaded");
        evidence.setCurrentHolder("Investigation Officer");

        Evidence saved = evidenceRepository.save(evidence);

        // Custody entry
        addCustodyLog(id, actorName, actorRole, "Evidence Created & Uploaded", now, truncateHash(evidence.getHashCurrent()), "ok");

        // Update case
        caseRepository.findById(caseId).ifPresent(c -> {
            List<String> ids = c.getEvidenceIds() == null ? new ArrayList<>() : new ArrayList<>(c.getEvidenceIds());
            ids.add(id);
            c.setEvidenceIds(ids);
            c.setEvidenceCollectedProgress(true);
            c.setLastUpdated(now);
            caseRepository.save(c);
        });

        auditLogService.log(actorName, actorRole, "Evidence Uploaded", id);
        return saved;
    }

    public Evidence verifyIntegrity(String evidenceId, String actorName, String actorRole) {
        return evidenceRepository.findById(evidenceId).map(e -> {
            e.setLastVerified(LocalDateTime.now());
            Evidence saved = evidenceRepository.save(e);
            String status = "mismatch".equals(e.getIntegrityStatus()) ? "Warning" : "Success";
            auditLogService.log(actorName, actorRole, "Evidence Integrity Verified", evidenceId, status);
            return saved;
        }).orElseThrow(() -> new RuntimeException("Evidence not found: " + evidenceId));
    }

    public Evidence submitToForensic(String evidenceId, String assignedTo, String purpose, String actorName, String actorRole) {
        return evidenceRepository.findById(evidenceId).map(e -> {
            LocalDateTime now = LocalDateTime.now();
            e.setStatus("Sent to Forensic");
            e.setCurrentHolder(assignedTo);
            Evidence saved = evidenceRepository.save(e);

            addCustodyLog(evidenceId, actorName, actorRole,
                    "Submitted to Forensic (" + assignedTo + ") — " + purpose,
                    now, truncateHash(e.getHashCurrent()), "ok");

            // Update case status
            caseRepository.findById(e.getCaseId()).ifPresent(c -> {
                c.setStatus("Forensic Examination");
                c.setForensicExaminationProgress(true);
                c.setLastUpdated(now);
                caseRepository.save(c);
            });

            auditLogService.log(actorName, actorRole, "Evidence Submitted to Forensic", evidenceId);
            return saved;
        }).orElseThrow(() -> new RuntimeException("Evidence not found: " + evidenceId));
    }

    public Evidence receiveEvidence(String evidenceId, String actorName, String actorRole) {
        return evidenceRepository.findById(evidenceId).map(e -> {
            LocalDateTime now = LocalDateTime.now();
            e.setStatus("Received");
            e.setCurrentHolder(actorName);
            Evidence saved = evidenceRepository.save(e);
            addCustodyLog(evidenceId, actorName, actorRole, "Received by Forensic Officer", now, truncateHash(e.getHashCurrent()), "ok");
            auditLogService.log(actorName, actorRole, "Evidence Received", evidenceId);
            return saved;
        }).orElseThrow(() -> new RuntimeException("Evidence not found: " + evidenceId));
    }

    public Evidence startExamination(String evidenceId, String actorName, String actorRole) {
        return evidenceRepository.findById(evidenceId).map(e -> {
            LocalDateTime now = LocalDateTime.now();
            e.setStatus("Under Examination");
            Evidence saved = evidenceRepository.save(e);
            addCustodyLog(evidenceId, actorName, actorRole, "Examination Started", now, truncateHash(e.getHashCurrent()), "ok");
            auditLogService.log(actorName, actorRole, "Examination Started", evidenceId);
            return saved;
        }).orElseThrow(() -> new RuntimeException("Evidence not found: " + evidenceId));
    }

    public Evidence completeExamination(String evidenceId, String examinationData, String actorName, String actorRole) {
        return evidenceRepository.findById(evidenceId).map(e -> {
            LocalDateTime now = LocalDateTime.now();
            e.setStatus("Examination Completed");
            e.setExaminationData(examinationData);
            Evidence saved = evidenceRepository.save(e);
            addCustodyLog(evidenceId, actorName, actorRole, "Examination Completed", now, truncateHash(e.getHashCurrent()), "ok");
            auditLogService.log(actorName, actorRole, "Examination Completed", evidenceId);
            return saved;
        }).orElseThrow(() -> new RuntimeException("Evidence not found: " + evidenceId));
    }

    public List<CustodyLog> getCustodyChain(String evidenceId) {
        return custodyLogRepository.findByEvidenceIdOrderByTimestampAsc(evidenceId);
    }

    public void deleteEvidence(String id) {
        evidenceRepository.deleteById(id);
    }

    private void addCustodyLog(String evidenceId, String actor, String role, String action, LocalDateTime timestamp, String hash, String status) {
        CustodyLog log = new CustodyLog();
        log.setEvidenceId(evidenceId);
        log.setActor(actor);
        log.setRole(role);
        log.setAction(action);
        log.setTimestamp(timestamp);
        log.setHash(hash);
        log.setStatus(status);
        custodyLogRepository.save(log);
    }

    private String truncateHash(String hash) {
        if (hash == null || hash.length() < 8) return hash;
        return hash.substring(0, 4) + "…" + hash.substring(hash.length() - 4);
    }
}
