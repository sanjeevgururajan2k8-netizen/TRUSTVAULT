package com.example.demo.controller;

import com.example.demo.entity.AuditLog;
import com.example.demo.service.AuditLogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
@CrossOrigin(origins = "*")
public class AuditLogController {

    private final AuditLogService auditLogService;

    public AuditLogController(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
    }

    @GetMapping
    public List<AuditLog> getAuditLogs(@RequestParam(required = false) String role) {
        if (role != null && !role.isBlank()) {
            return auditLogService.getLogsForRole(role);
        }
        return auditLogService.getAllLogs();
    }
}
