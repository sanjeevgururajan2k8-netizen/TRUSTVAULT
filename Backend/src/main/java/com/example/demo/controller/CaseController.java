package com.example.demo.controller;

import com.example.demo.entity.InvestigationCase;
import com.example.demo.service.CaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cases")
@CrossOrigin(origins = "*")
public class CaseController {

    private final CaseService caseService;

    public CaseController(CaseService caseService) {
        this.caseService = caseService;
    }

    @GetMapping
    public List<InvestigationCase> getAllCases(
            @RequestParam(required = false) String investigatorId,
            @RequestParam(required = false) String role) {
        if (investigatorId != null && role != null) {
            return caseService.getCasesForUser(investigatorId, role);
        }
        return caseService.getAllCases();
    }

    @GetMapping("/court")
    public List<InvestigationCase> getCourtCases() {
        return caseService.getSubmittedCourtCases();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvestigationCase> getCaseById(@PathVariable String id) {
        return caseService.getCaseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<InvestigationCase> createCase(
            @RequestBody InvestigationCase cas,
            @RequestParam(defaultValue = "System") String actorName,
            @RequestParam(defaultValue = "investigation") String actorRole) {
        return ResponseEntity.ok(caseService.createCase(cas, actorName, actorRole));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvestigationCase> updateCase(
            @PathVariable String id,
            @RequestBody InvestigationCase cas) {
        cas.setId(id);
        return ResponseEntity.ok(caseService.updateCase(cas));
    }

    @PostMapping("/{id}/submit-to-court")
    public ResponseEntity<InvestigationCase> submitToCourt(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        String actorName = body.getOrDefault("actorName", "System");
        String actorRole = body.getOrDefault("actorRole", "investigation");
        return ResponseEntity.ok(caseService.submitToCourt(id, actorName, actorRole));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCase(@PathVariable String id) {
        caseService.deleteCase(id);
        return ResponseEntity.noContent().build();
    }
}
