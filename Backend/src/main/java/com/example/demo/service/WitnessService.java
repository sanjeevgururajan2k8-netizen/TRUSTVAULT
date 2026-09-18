package com.example.demo.service;

import com.example.demo.entity.Witness;
import com.example.demo.repository.InvestigationCaseRepository;
import com.example.demo.repository.WitnessRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WitnessService {

    private final WitnessRepository witnessRepository;
    private final InvestigationCaseRepository caseRepository;
    private final AuditLogService auditLogService;

    public WitnessService(WitnessRepository witnessRepository, InvestigationCaseRepository caseRepository, AuditLogService auditLogService) {
        this.witnessRepository = witnessRepository;
        this.caseRepository = caseRepository;
        this.auditLogService = auditLogService;
    }

    public List<Witness> getAllWitnesses() {
        return witnessRepository.findAll();
    }

    public Optional<Witness> getWitnessById(String id) {
        return witnessRepository.findById(id);
    }

    public List<Witness> getWitnessesByCase(String caseId) {
        return witnessRepository.findByCaseId(caseId);
    }

    public Witness addWitness(String caseId, Witness witness, String actorName, String actorRole) {
        long count = witnessRepository.count();
        String wid = String.format("WT-%02d", count + 1);
        witness.setId(wid);
        witness.setCaseId(caseId);
        witness.setStatementDate(LocalDate.now());
        witness.setStatus("Recorded");
        Witness saved = witnessRepository.save(witness);

        // Update case witness list
        caseRepository.findById(caseId).ifPresent(c -> {
            List<String> wids = c.getWitnessIds() == null ? new java.util.ArrayList<>() : new java.util.ArrayList<>(c.getWitnessIds());
            wids.add(wid);
            c.setWitnessIds(wids);
            c.setLastUpdated(LocalDateTime.now());
            caseRepository.save(c);
        });

        auditLogService.log(actorName, actorRole, "Witness Statement Added", wid);
        return saved;
    }

    public Witness updateWitness(Witness witness) {
        return witnessRepository.save(witness);
    }

    public void deleteWitness(String id) {
        witnessRepository.deleteById(id);
    }
}
