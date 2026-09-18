package com.example.demo.controller;

import com.example.demo.entity.Witness;
import com.example.demo.service.WitnessService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/witnesses")
@CrossOrigin(origins = "*")
public class WitnessController {

    private final WitnessService witnessService;

    public WitnessController(WitnessService witnessService) {
        this.witnessService = witnessService;
    }

    @GetMapping
    public List<Witness> getAllWitnesses() {
        return witnessService.getAllWitnesses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Witness> getWitnessById(@PathVariable String id) {
        return witnessService.getWitnessById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/by-case/{caseId}")
    public List<Witness> getWitnessesByCase(@PathVariable String caseId) {
        return witnessService.getWitnessesByCase(caseId);
    }

    @PostMapping("/case/{caseId}")
    public ResponseEntity<Witness> addWitness(
            @PathVariable String caseId,
            @RequestBody Witness witness,
            @RequestParam(defaultValue = "System") String actorName,
            @RequestParam(defaultValue = "investigation") String actorRole) {
        return ResponseEntity.ok(witnessService.addWitness(caseId, witness, actorName, actorRole));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Witness> updateWitness(@PathVariable String id, @RequestBody Witness witness) {
        witness.setId(id);
        return ResponseEntity.ok(witnessService.updateWitness(witness));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWitness(@PathVariable String id) {
        witnessService.deleteWitness(id);
        return ResponseEntity.noContent().build();
    }
}
