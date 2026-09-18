package com.example.demo.service;

import com.example.demo.entity.AuditLog;
import com.example.demo.repository.AuditLogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void log(String actor, String role, String action, String entity) {
        log(actor, role, action, entity, "Success");
    }

    public void log(String actor, String role, String action, String entity, String status) {
        AuditLog log = new AuditLog();
        log.setId("AL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        log.setTimestamp(LocalDateTime.now());
        log.setActor(actor);
        log.setRole(role);
        log.setAction(action);
        log.setEntity(entity);
        log.setIp("0.0.0.0"); // In real app, inject from HttpServletRequest
        log.setStatus(status);
        auditLogRepository.save(log);
    }

    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAll();
    }

    public List<AuditLog> getLogsForRole(String role) {
        if ("admin".equals(role)) {
            return auditLogRepository.findAll();
        }
        if ("court".equals(role)) {
            List<AuditLog> caseLogs = auditLogRepository.findByEntityStartingWith("CASE");
            List<AuditLog> evLogs = auditLogRepository.findByEntityStartingWith("EV");
            List<AuditLog> frLogs = auditLogRepository.findByEntityStartingWith("FR");
            caseLogs.addAll(evLogs);
            caseLogs.addAll(frLogs);
            return caseLogs;
        }
        return auditLogRepository.findByRole(role);
    }
}
