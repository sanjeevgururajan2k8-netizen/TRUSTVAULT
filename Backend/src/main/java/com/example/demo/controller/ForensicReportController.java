package com.example.demo.controller;

import com.example.demo.entity.ForensicReport;
import com.example.demo.service.ForensicReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/forensic-reports")
@CrossOrigin(origins = "*")
public class ForensicReportController {

    private final ForensicReportService reportService;

    public ForensicReportController(ForensicReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping
    public List<ForensicReport> getAllReports() {
        return reportService.getAllReports();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ForensicReport> getReportById(@PathVariable String id) {
        return reportService.getReportById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/by-case/{caseId}")
    public List<ForensicReport> getReportsByCase(@PathVariable String caseId) {
        return reportService.getReportsByCase(caseId);
    }

    @PostMapping("/case/{caseId}")
    public ResponseEntity<ForensicReport> submitReport(
            @PathVariable String caseId,
            @RequestBody Map<String, Object> body,
            @RequestParam(defaultValue = "System") String actorName,
            @RequestParam(defaultValue = "forensic") String actorRole) {

        @SuppressWarnings("unchecked")
        List<String> evidenceIds = (List<String>) body.get("evidenceIds");

        ForensicReport report = new ForensicReport();
        report.setMethod((String) body.get("method"));
        report.setObservations((String) body.get("observations"));
        report.setFindings((String) body.get("findings"));
        report.setConclusion((String) body.get("conclusion"));

        @SuppressWarnings("unchecked")
        List<String> supportingFiles = (List<String>) body.get("supportingFiles");
        report.setSupportingFiles(supportingFiles);
        report.setExaminerId(actorName);

        return ResponseEntity.ok(reportService.submitReport(caseId, evidenceIds, report, actorName, actorRole));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ForensicReport> updateReport(@PathVariable String id, @RequestBody ForensicReport report) {
        report.setId(id);
        return ResponseEntity.ok(reportService.updateReport(report));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable String id) {
        reportService.deleteReport(id);
        return ResponseEntity.noContent().build();
    }
}
