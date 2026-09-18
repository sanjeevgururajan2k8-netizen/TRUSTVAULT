package com.example.demo.controller;

import com.example.demo.entity.CustodyLog;
import com.example.demo.entity.Evidence;
import com.example.demo.service.EvidenceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/evidence")
@CrossOrigin(origins = "*")
public class EvidenceController {

    private final EvidenceService evidenceService;

    public EvidenceController(EvidenceService evidenceService) {
        this.evidenceService = evidenceService;
    }

    @GetMapping
    public List<Evidence> getAllEvidence() {
        return evidenceService.getAllEvidence();
    }

    @GetMapping("/forensic-queue")
    public List<Evidence> getForensicWorkQueue() {
        return evidenceService.getForensicWorkQueue();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evidence> getEvidenceById(@PathVariable String id) {
        return evidenceService.getEvidenceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/by-case/{caseId}")
    public List<Evidence> getEvidenceByCase(@PathVariable String caseId) {
        return evidenceService.getEvidenceByCase(caseId);
    }

    @PostMapping("/case/{caseId}")
    public ResponseEntity<Evidence> addEvidence(
            @PathVariable String caseId,
            @RequestBody Evidence evidence,
            @RequestParam(defaultValue = "System") String actorName,
            @RequestParam(defaultValue = "investigation") String actorRole) {
        return ResponseEntity.ok(evidenceService.addEvidence(caseId, evidence, actorName, actorRole));
    }

    @PostMapping("/{id}/verify-integrity")
    public ResponseEntity<Evidence> verifyIntegrity(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(evidenceService.verifyIntegrity(id,
                body.getOrDefault("actorName", "System"),
                body.getOrDefault("actorRole", "investigation")));
    }

    @PostMapping("/{id}/submit-to-forensic")
    public ResponseEntity<Evidence> submitToForensic(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(evidenceService.submitToForensic(
                id,
                body.getOrDefault("assignedTo", "Digital Forensics Laboratory"),
                body.getOrDefault("purpose", "General Examination"),
                body.getOrDefault("actorName", "System"),
                body.getOrDefault("actorRole", "investigation")));
    }

    @PostMapping("/{id}/receive")
    public ResponseEntity<Evidence> receiveEvidence(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(evidenceService.receiveEvidence(id,
                body.getOrDefault("actorName", "System"),
                body.getOrDefault("actorRole", "forensic")));
    }

    @PostMapping("/{id}/start-examination")
    public ResponseEntity<Evidence> startExamination(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(evidenceService.startExamination(id,
                body.getOrDefault("actorName", "System"),
                body.getOrDefault("actorRole", "forensic")));
    }

    @PostMapping("/{id}/complete-examination")
    public ResponseEntity<Evidence> completeExamination(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(evidenceService.completeExamination(
                id,
                body.getOrDefault("examinationData", "{}"),
                body.getOrDefault("actorName", "System"),
                body.getOrDefault("actorRole", "forensic")));
    }

    @GetMapping("/{id}/custody")
    public List<CustodyLog> getCustodyChain(@PathVariable String id) {
        return evidenceService.getCustodyChain(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvidence(@PathVariable String id) {
        evidenceService.deleteEvidence(id);
        return ResponseEntity.noContent().build();
    }
}
