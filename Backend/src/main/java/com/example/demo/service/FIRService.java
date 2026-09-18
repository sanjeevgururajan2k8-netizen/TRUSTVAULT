package com.example.demo.service;

import com.example.demo.entity.FIR;
import com.example.demo.repository.FIRRepository;
import com.example.demo.repository.InvestigationCaseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class FIRService {

    private final FIRRepository firRepository;
    private final InvestigationCaseRepository caseRepository;
    private final AuditLogService auditLogService;

    public FIRService(FIRRepository firRepository, InvestigationCaseRepository caseRepository, AuditLogService auditLogService) {
        this.firRepository = firRepository;
        this.caseRepository = caseRepository;
        this.auditLogService = auditLogService;
    }

    public List<FIR> getAllFirs() {
        return firRepository.findAll();
    }

    public Optional<FIR> getFirById(String id) {
        return firRepository.findById(id);
    }

    public Optional<FIR> getFirByCase(String caseId) {
        return firRepository.findByCaseId(caseId);
    }

    public FIR addFir(String caseId, FIR fir, String actorName, String actorRole) {
        String firId = "FIR-" + (10000 + new Random().nextInt(90000));
        fir.setId(firId);
        fir.setCaseId(caseId);
        fir.setFiledDate(LocalDateTime.now());
        if (fir.getDocumentName() == null || fir.getDocumentName().isBlank()) {
            fir.setDocumentName(firId + ".pdf");
        }

        FIR saved = firRepository.save(fir);

        // Update case
        caseRepository.findById(caseId).ifPresent(c -> {
            c.setFirId(firId);
            c.setFirAddedProgress(true);
            c.setLastUpdated(LocalDateTime.now());
            caseRepository.save(c);
        });

        auditLogService.log(actorName, actorRole, "FIR Added", firId);
        return saved;
    }

    public FIR updateFir(FIR fir) {
        return firRepository.save(fir);
    }

    public void deleteFir(String id) {
        firRepository.deleteById(id);
    }
}
