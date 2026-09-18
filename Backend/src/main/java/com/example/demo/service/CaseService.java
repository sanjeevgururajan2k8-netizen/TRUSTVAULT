package com.example.demo.service;

import com.example.demo.entity.InvestigationCase;
import com.example.demo.repository.InvestigationCaseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CaseService {

    private final InvestigationCaseRepository caseRepository;
    private final AuditLogService auditLogService;

    public CaseService(InvestigationCaseRepository caseRepository, AuditLogService auditLogService) {
        this.caseRepository = caseRepository;
        this.auditLogService = auditLogService;
    }

    public List<InvestigationCase> getAllCases() {
        return caseRepository.findAll();
    }

    public List<InvestigationCase> getCasesForUser(String investigatorId, String role) {
        if ("investigation".equals(role)) {
            return caseRepository.findByInvestigatorId(investigatorId);
        }
        return caseRepository.findAll();
    }

    public Optional<InvestigationCase> getCaseById(String id) {
        return caseRepository.findById(id);
    }

    public InvestigationCase createCase(InvestigationCase cas, String actorName, String actorRole) {
        LocalDateTime now = LocalDateTime.now();
        // Generate ID if not provided
        if (cas.getId() == null || cas.getId().isBlank()) {
            long count = caseRepository.count();
            cas.setId(String.format("CASE-%d-%05d", LocalDateTime.now().getYear(), count + 1));
        }
        cas.setStatus("Under Investigation");
        cas.setCreatedDate(now);
        cas.setLastUpdated(now);
        cas.setCaseCreatedProgress(true);
        cas.setSubmittedToCourt(false);
        InvestigationCase saved = caseRepository.save(cas);
        auditLogService.log(actorName, actorRole, "Case Created", saved.getId());
        return saved;
    }

    public InvestigationCase updateCase(InvestigationCase cas) {
        cas.setLastUpdated(LocalDateTime.now());
        return caseRepository.save(cas);
    }

    public InvestigationCase submitToCourt(String caseId, String actorName, String actorRole) {
        return caseRepository.findById(caseId).map(c -> {
            LocalDateTime now = LocalDateTime.now();
            c.setSubmittedToCourt(true);
            c.setStatus("Submitted to Court");
            c.setCourtSubmissionDate(now);
            c.setCourtSubmissionProgress(true);
            c.setLastUpdated(now);
            InvestigationCase saved = caseRepository.save(c);
            auditLogService.log(actorName, actorRole, "Case Submitted to Court", caseId);
            return saved;
        }).orElseThrow(() -> new RuntimeException("Case not found: " + caseId));
    }

    public List<InvestigationCase> getSubmittedCourtCases() {
        return caseRepository.findAll().stream()
                .filter(c -> c.isSubmittedToCourt() || "Submitted to Court".equals(c.getStatus()) || "Under Judicial Review".equals(c.getStatus()))
                .toList();
    }

    public void deleteCase(String id) {
        caseRepository.deleteById(id);
    }
}
