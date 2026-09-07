import { getFirByCase, getEvidenceByCase, getForensicReportsByCase } from "../data/api";

/** Synthesizes a chronological case-level timeline from FIR, evidence and report dates. */
export function buildCaseTimeline(caseObj) {
  const events = [];

  events.push({ actor: "System", role: "", action: "Case Created", timestamp: caseObj.createdDate, status: "ok" });

  const fir = getFirByCase(caseObj.id);
  if (fir) {
    events.push({ actor: fir.officer, role: "Investigation Officer", action: `FIR Filed (${fir.firNumber})`, timestamp: fir.filedDate, status: "ok" });
  }

  getEvidenceByCase(caseObj.id).forEach((e) => {
    events.push({ actor: e.uploadedBy, role: "Investigation Officer", action: `Evidence Uploaded — ${e.id} (${e.type})`, timestamp: e.uploadDate, status: "ok" });
  });

  getForensicReportsByCase(caseObj.id).forEach((r) => {
    events.push({ actor: r.examiner, role: "Forensic Officer", action: `Forensic Report Submitted (${r.id})`, timestamp: r.date, status: "ok" });
  });

  if (caseObj.courtSubmissionDate) {
    events.push({ actor: "Investigation Officer", role: "", action: "Case Submitted to Court", timestamp: caseObj.courtSubmissionDate, status: "ok" });
  }

  return events.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}
