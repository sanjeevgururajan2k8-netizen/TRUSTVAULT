package com.example.demo.service;

import com.example.demo.entity.CustodyLog;
import com.example.demo.entity.Evidence;
import com.example.demo.entity.ForensicReport;
import com.example.demo.repository.CustodyLogRepository;
import com.example.demo.repository.EvidenceRepository;
import com.example.demo.repository.ForensicReportRepository;
import com.example.demo.repository.InvestigationCaseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ForensicReportService {

    private final ForensicReportRepository reportRepository;
    private final InvestigationCaseRepository caseRepository;
    private final EvidenceRepository evidenceRepository;
    private final CustodyLogRepository custodyLogRepository;
    private final AuditLogService auditLogService;

    public ForensicReportService(ForensicReportRepository reportRepository,
                                  InvestigationCaseRepository caseRepository,
                                  EvidenceRepository evidenceRepository,
                                  CustodyLogRepository custodyLogRepository,
                                  AuditLogService auditLogService) {
        this.reportRepository = reportRepository;
        this.caseRepository = caseRepository;
        this.evidenceRepository = evidenceRepository;
        this.custodyLogRepository = custodyLogRepository;
        this.auditLogService = auditLogService;
    }

    public List<ForensicReport> getAllReports() {
        return reportRepository.findAll();
    }

    public Optional<ForensicReport> getReportById(String id) {
        return reportRepository.findById(id);
    }

    public List<ForensicReport> getReportsByCase(String caseId) {
        return reportRepository.findByCaseId(caseId);
    }

    public ForensicReport submitReport(String caseId, List<String> evidenceIds, ForensicReport report, String actorName, String actorRole) {
        LocalDateTime now = LocalDateTime.now();
        long count = reportRepository.count();
        String id = String.format("FR-%d-%04d", LocalDateTime.now().getYear(), count + 1);
        report.setId(id);
        report.setCaseId(caseId);
        report.setEvidenceIds(evidenceIds);
        report.setExaminer(actorName);
        report.setDate(now);
        report.setStatus("Submitted");

        ForensicReport saved = reportRepository.save(report);

        // Update case
        caseRepository.findById(caseId).ifPresent(c -> {
            List<String> rids = c.getForensicReportIds() == null ? new ArrayList<>() : new ArrayList<>(c.getForensicReportIds());
            rids.add(id);
            c.setForensicReportIds(rids);
            c.setForensicReportProgress(true);
            c.setStatus("Report Received");
            c.setLastUpdated(now);
            caseRepository.save(c);
        });

        // Update each evidence
        for (String evId : evidenceIds) {
            evidenceRepository.findById(evId).ifPresent(e -> {
                e.setStatus("Report Submitted");
                evidenceRepository.save(e);

                CustodyLog log = new CustodyLog();
                log.setEvidenceId(evId);
                log.setActor(actorName);
                log.setRole(actorRole);
                log.setAction("Forensic Report Submitted (" + id + ")");
                log.setTimestamp(now);
                String hash = e.getHashCurrent();
                log.setHash(hash != null && hash.length() >= 8 ? hash.substring(0, 4) + "…" + hash.substring(hash.length() - 4) : hash);
                log.setStatus("ok");
                custodyLogRepository.save(log);
            });
        }

        auditLogService.log(actorName, actorRole, "Forensic Report Submitted", id);
        return saved;
    }

    public ForensicReport updateReport(ForensicReport report) {
        return reportRepository.save(report);
    }

    public void deleteReport(String id) {
        reportRepository.deleteById(id);
    }
}
