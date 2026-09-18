package com.example.demo.controller;

import com.example.demo.entity.FIR;
import com.example.demo.service.FIRService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/firs")
@CrossOrigin(origins = "*")
public class FIRController {

    private final FIRService firService;

    public FIRController(FIRService firService) {
        this.firService = firService;
    }

    @GetMapping
    public List<FIR> getAllFirs() {
        return firService.getAllFirs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FIR> getFirById(@PathVariable String id) {
        return firService.getFirById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/by-case/{caseId}")
    public ResponseEntity<FIR> getFirByCase(@PathVariable String caseId) {
        return firService.getFirByCase(caseId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/case/{caseId}")
    public ResponseEntity<FIR> addFir(
            @PathVariable String caseId,
            @RequestBody FIR fir,
            @RequestParam(defaultValue = "System") String actorName,
            @RequestParam(defaultValue = "investigation") String actorRole) {
        return ResponseEntity.ok(firService.addFir(caseId, fir, actorName, actorRole));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FIR> updateFir(@PathVariable String id, @RequestBody FIR fir) {
        fir.setId(id);
        return ResponseEntity.ok(firService.updateFir(fir));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFir(@PathVariable String id) {
        firService.deleteFir(id);
        return ResponseEntity.noContent().build();
    }
}
