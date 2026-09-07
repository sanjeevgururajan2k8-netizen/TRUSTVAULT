// ============================================================================
// Prototype "service" layer — mimics the shape of future REST calls to the
// Spring Boot backend. Every function here is synchronous and reads from the
// in-memory mock store; swapping these bodies for `fetch(...)` calls later
// should not require changes to the pages/components that consume them.
// ============================================================================
import {
  CASES, EVIDENCE, FIRS, WITNESSES, CUSTODY, FORENSIC_REPORTS, AUDIT_LOGS, USERS, ROLES, ROLE_LABELS,
} from "./mockData";
import { nextCaseId, nextEvidenceId, simulateSha256 } from "../utils/helpers";

export function getCasesForUser(user) {
  if (!user) return [];
  if (user.role === ROLES.INVESTIGATOR) {
    return CASES.filter((c) => c.investigatorId === user.id);
  }
  // Forensic officers, Court Justices and Administrators work across cases in this prototype.
  return CASES;
}

export function getCaseById(id) {
  return CASES.find((c) => c.id === id) || null;
}

export function getEvidenceByCase(caseId) {
  const c = getCaseById(caseId);
  if (!c) return [];
  return c.evidenceIds.map((id) => EVIDENCE[id]).filter(Boolean);
}

export function getEvidenceById(id) {
  return EVIDENCE[id] || null;
}

export function getAllEvidence() {
  return Object.values(EVIDENCE);
}

export function getFirByCase(caseId) {
  return Object.values(FIRS).find((f) => f.caseId === caseId) || null;
}

export function getWitnessesByCase(caseId) {
  return Object.values(WITNESSES).filter((w) => w.caseId === caseId);
}

export function getCustody(evidenceId) {
  return CUSTODY[evidenceId] || [];
}

export function getForensicReportById(id) {
  return FORENSIC_REPORTS[id] || null;
}

export function getForensicReportsByCase(caseId) {
  return Object.values(FORENSIC_REPORTS).filter((r) => r.caseId === caseId);
}

export function getForensicReportByEvidence(evidenceId) {
  return Object.values(FORENSIC_REPORTS).find((r) => r.evidenceIds.includes(evidenceId)) || null;
}

export function getAllForensicReports() {
  return Object.values(FORENSIC_REPORTS);
}

export function getAuditLogsForRole(role) {
  if (role === ROLES.ADMIN) return AUDIT_LOGS;
  if (role === ROLES.COURT) return AUDIT_LOGS.filter((l) => l.entity.startsWith("CASE") || l.entity.startsWith("EV") || l.entity.startsWith("FR"));
  return AUDIT_LOGS.filter((l) => l.role === role);
}

export function getUserById(id) {
  return USERS.find((u) => u.id === id) || null;
}

/** Evidence assigned to / touched by a forensic officer (demo: all evidence submitted to forensic or later). */
export function getForensicWorkQueue() {
  return getAllEvidence().filter((e) =>
    ["Sent to Forensic", "Received", "Under Examination", "Examination Completed", "Report Submitted"].includes(e.status)
  );
}

export function getSubmittedCourtCases() {
  return CASES.filter((c) => c.submittedToCourt || c.status === "Submitted to Court" || c.status === "Under Judicial Review");
}

/**
 * Global search across authorized records for the current role.
 * Returns { cases, evidence, reports, witnesses }.
 */
export function globalSearch(user, query) {
  const q = query.trim().toLowerCase();
  const empty = { cases: [], evidence: [], reports: [], witnesses: [] };
  if (!q || !user) return empty;

  const authorizedCases = getCasesForUser(user);
  const authorizedCaseIds = new Set(authorizedCases.map((c) => c.id));

  const cases = authorizedCases.filter(
    (c) => c.id.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.caseNumber.toLowerCase().includes(q)
  );

  const evidence = getAllEvidence().filter(
    (e) => authorizedCaseIds.has(e.caseId) && (e.id.toLowerCase().includes(q) || e.name.toLowerCase().includes(q))
  );

  const reports = getAllForensicReports().filter(
    (r) => authorizedCaseIds.has(r.caseId) && (r.id.toLowerCase().includes(q) || r.examiner.toLowerCase().includes(q))
  );

  const witnesses = Object.values(WITNESSES).filter(
    (w) => authorizedCaseIds.has(w.caseId) && w.name.toLowerCase().includes(q)
  );

  return { cases, evidence, reports, witnesses };
}

// ============================================================================
// Mutations
// Prototype-only: these write directly into the in-memory mock store so the
// demo workflow (create → upload → submit → examine → report → court) feels
// real across page navigations. A real backend integration would replace the
// bodies below with POST/PUT calls, leaving call-sites untouched.
// ============================================================================

let auditSeq = 2000;
export function logAudit(actor, role, action, entity, status = "Success") {
  AUDIT_LOGS.unshift({
    id: `AL-${++auditSeq}`,
    timestamp: new Date().toISOString(),
    actor,
    role,
    action,
    entity,
    ip: "10.24.6.112",
    status,
  });
}

export function createCase(data, user) {
  const id = nextCaseId(CASES.map((c) => c.id));
  const now = new Date().toISOString();
  const newCase = {
    id,
    caseNumber: data.caseNumber,
    title: data.title,
    incidentDate: data.incidentDate,
    incidentLocation: data.incidentLocation,
    priority: data.priority,
    status: "Under Investigation",
    investigatorId: user.id,
    createdDate: now,
    lastUpdated: now,
    description: data.description,
    notes: data.notes,
    evidenceIds: [],
    firId: null,
    witnessIds: [],
    forensicReportIds: [],
    submittedToCourt: false,
    courtSubmissionDate: null,
    progress: {
      caseCreated: true,
      firAdded: false,
      evidenceCollected: false,
      forensicExamination: false,
      forensicReport: false,
      courtSubmission: false,
    },
  };
  CASES.unshift(newCase);
  logAudit(user.name, user.role, "Case Created", id);
  return newCase;
}

export function addFir(caseId, data, user) {
  const firId = `FIR-${String(Math.floor(Math.random() * 90000) + 10000)}`;
  FIRS[firId] = {
    id: firId,
    caseId,
    firNumber: data.firNumber,
    policeStation: data.policeStation,
    incidentDate: data.incidentDate,
    complainant: data.complainant,
    officer: user.name,
    description: data.description,
    documentName: data.documentName || `${firId}.pdf`,
    filedDate: new Date().toISOString(),
  };
  const c = getCaseById(caseId);
  if (c) {
    c.firId = firId;
    c.progress.firAdded = true;
    c.lastUpdated = new Date().toISOString();
  }
  logAudit(user.name, user.role, "FIR Added", firId);
  return FIRS[firId];
}

export function addWitness(caseId, data, user) {
  const wid = `WT-${String(Object.keys(WITNESSES).length + 1).padStart(2, "0")}`;
  WITNESSES[wid] = {
    id: wid,
    caseId,
    name: data.name,
    role: data.role,
    statementDate: new Date().toISOString().slice(0, 10),
    status: "Recorded",
    summaryAvailable: false,
    statementText: data.statementText,
  };
  const c = getCaseById(caseId);
  if (c) {
    c.witnessIds.push(wid);
    c.lastUpdated = new Date().toISOString();
  }
  logAudit(user.name, user.role, "Witness Statement Added", wid);
  return WITNESSES[wid];
}

export function addEvidence(caseId, fileMeta, user) {
  const id = nextEvidenceId(Object.keys(EVIDENCE));
  const now = new Date().toISOString();
  const hash = fileMeta.hash || simulateSha256(fileMeta.file?.name || id);
  const record = {
    id,
    caseId,
    name: fileMeta.name || fileMeta.file?.name || "Untitled Evidence",
    type: fileMeta.type || "Document",
    fileName: fileMeta.file?.name || `${id}.dat`,
    fileSize: fileMeta.file ? `${(fileMeta.file.size / (1024 * 1024)).toFixed(2)} MB` : "—",
    uploadedBy: user.name,
    uploadDate: now,
    hashOriginal: hash,
    hashCurrent: hash,
    integrityStatus: "verified",
    lastVerified: now,
    status: "Uploaded",
    currentHolder: "Investigation Officer",
  };
  EVIDENCE[id] = record;
  CUSTODY[id] = [
    { actor: user.name, role: ROLE_LABELS[user.role], action: "Evidence Created & Uploaded", timestamp: now, hash: hash.slice(0, 4) + "…" + hash.slice(-4), status: "ok" },
  ];
  const c = getCaseById(caseId);
  if (c) {
    c.evidenceIds.push(id);
    c.progress.evidenceCollected = true;
    c.lastUpdated = now;
  }
  logAudit(user.name, user.role, "Evidence Uploaded", id);
  return record;
}

export function verifyEvidenceIntegrity(evidenceId, user) {
  const e = getEvidenceById(evidenceId);
  if (!e) return null;
  e.lastVerified = new Date().toISOString();
  logAudit(user.name, user.role, "Evidence Integrity Verified", evidenceId, e.integrityStatus === "mismatch" ? "Warning" : "Success");
  return e;
}

export function submitEvidenceToForensic(evidenceId, assignedTo, purpose, user) {
  const e = getEvidenceById(evidenceId);
  if (!e) return null;
  const now = new Date().toISOString();
  e.status = "Sent to Forensic";
  e.currentHolder = assignedTo;
  CUSTODY[evidenceId] = CUSTODY[evidenceId] || [];
  CUSTODY[evidenceId].push({
    actor: user.name,
    role: ROLE_LABELS[user.role],
    action: `Submitted to Forensic (${assignedTo}) — ${purpose}`,
    timestamp: now,
    hash: e.hashCurrent.slice(0, 4) + "…" + e.hashCurrent.slice(-4),
    status: "ok",
  });
  const c = getCaseById(e.caseId);
  if (c) {
    c.status = "Forensic Examination";
    c.lastUpdated = now;
  }
  logAudit(user.name, user.role, "Evidence Submitted to Forensic", evidenceId);
  return e;
}

export function receiveEvidence(evidenceId, user) {
  const e = getEvidenceById(evidenceId);
  if (!e) return null;
  const now = new Date().toISOString();
  e.status = "Received";
  e.currentHolder = user.name;
  CUSTODY[evidenceId].push({ actor: user.name, role: ROLE_LABELS[user.role], action: "Received by Forensic Officer", timestamp: now, hash: e.hashCurrent.slice(0, 4) + "…" + e.hashCurrent.slice(-4), status: "ok" });
  logAudit(user.name, user.role, "Evidence Received", evidenceId);
  return e;
}

export function startExamination(evidenceId, user) {
  const e = getEvidenceById(evidenceId);
  if (!e) return null;
  const now = new Date().toISOString();
  e.status = "Under Examination";
  CUSTODY[evidenceId].push({ actor: user.name, role: ROLE_LABELS[user.role], action: "Examination Started", timestamp: now, hash: e.hashCurrent.slice(0, 4) + "…" + e.hashCurrent.slice(-4), status: "ok" });
  logAudit(user.name, user.role, "Examination Started", evidenceId);
  return e;
}

export function completeExamination(evidenceId, examData, user) {
  const e = getEvidenceById(evidenceId);
  if (!e) return null;
  const now = new Date().toISOString();
  e.status = "Examination Completed";
  e.examination = { ...examData, examinedBy: user.name, examinedAt: now };
  CUSTODY[evidenceId].push({ actor: user.name, role: ROLE_LABELS[user.role], action: "Examination Completed", timestamp: now, hash: e.hashCurrent.slice(0, 4) + "…" + e.hashCurrent.slice(-4), status: "ok" });
  logAudit(user.name, user.role, "Examination Completed", evidenceId);
  return e;
}

let reportSeq = 200;
export function submitForensicReport(caseId, evidenceIds, reportData, user) {
  const id = `FR-2026-${String(++reportSeq).padStart(4, "0")}`;
  const now = new Date().toISOString();
  FORENSIC_REPORTS[id] = {
    id,
    caseId,
    evidenceIds,
    examiner: user.name,
    examinerId: user.id,
    date: now,
    method: reportData.method,
    observations: reportData.observations,
    findings: reportData.findings,
    conclusion: reportData.conclusion,
    status: "Submitted",
    supportingFiles: reportData.supportingFiles || [],
  };
  const c = getCaseById(caseId);
  if (c) {
    c.forensicReportIds.push(id);
    c.progress.forensicReport = true;
    c.status = "Report Received";
    c.lastUpdated = now;
  }
  evidenceIds.forEach((evId) => {
    const e = getEvidenceById(evId);
    if (e) {
      e.status = "Report Submitted";
      CUSTODY[evId] = CUSTODY[evId] || [];
      CUSTODY[evId].push({ actor: user.name, role: ROLE_LABELS[user.role], action: `Forensic Report Submitted (${id})`, timestamp: now, hash: e.hashCurrent.slice(0, 4) + "…" + e.hashCurrent.slice(-4), status: "ok" });
    }
  });
  logAudit(user.name, user.role, "Forensic Report Submitted", id);
  return FORENSIC_REPORTS[id];
}

export function submitCaseToCourt(caseId, user) {
  const c = getCaseById(caseId);
  if (!c) return null;
  const now = new Date().toISOString();
  c.submittedToCourt = true;
  c.status = "Submitted to Court";
  c.courtSubmissionDate = now;
  c.progress.courtSubmission = true;
  c.lastUpdated = now;
  logAudit(user.name, user.role, "Case Submitted to Court", caseId);
  return c;
}

export function createUser(data, actingUser) {
  const id = `USR-${String(USERS.length + 1).padStart(3, "0")}`;
  const record = {
    id,
    employeeId: data.employeeId,
    name: data.name,
    email: data.email,
    role: data.role,
    department: data.department,
    status: "Active",
    lastLogin: null,
    badgeInitials: data.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
  };
  USERS.push(record);
  logAudit(actingUser.name, actingUser.role, "User Created", `${id} (${record.name})`);
  return record;
}

export function setUserStatus(userId, status, actingUser) {
  const u = getUserById(userId);
  if (!u) return null;
  u.status = status;
  logAudit(actingUser.name, actingUser.role, status === "Active" ? "User Activated" : "User Deactivated", `${userId} (${u.name})`);
  return u;
}
