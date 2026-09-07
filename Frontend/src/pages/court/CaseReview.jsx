import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Info, FileText, Users, Shield, Microscope, ScrollText, History, Eye, Download } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import {
  getCaseById, getFirByCase, getWitnessesByCase, getEvidenceByCase, getForensicReportsByCase, getCustody, getAuditLogsForRole,
} from "../../data/api";
import CaseHeader from "../../components/domain/CaseHeader";
import CaseTabs from "../../components/domain/CaseTabs";
import ReportViewer from "../../components/domain/ReportViewer";
import VerticalTimeline from "../../components/domain/VerticalTimeline";
import CourtEvidenceReview from "../../components/domain/CourtEvidenceReview";
import AuditLogTable from "../../components/domain/AuditLogTable";
import EmptyState from "../../components/ui/EmptyState";
import { formatDate } from "../../utils/helpers";
import NotFound from "../errors/NotFound";

const TABS = [
  { key: "overview", label: "Case Overview", icon: Info },
  { key: "fir", label: "FIR", icon: FileText },
  { key: "witnesses", label: "Witnesses", icon: Users },
  { key: "evidence", label: "Evidence", icon: Shield },
  { key: "forensic", label: "Forensic Report", icon: Microscope },
  { key: "custody", label: "Chain of Custody", icon: ScrollText },
  { key: "audit", label: "Audit Trail", icon: History },
];

export default function CourtCaseReview() {
  const { id } = useParams();
  const { role } = useAuth();
  const toast = useToast();
  const [params, setParams] = useSearchParams();

  const caseObj = getCaseById(id);
  if (!caseObj) return <NotFound />;

  const activeTab = params.get("tab") || "overview";
  const setActiveTab = (key) => setParams({ tab: key }, { replace: true });

  const fir = getFirByCase(id);
  const witnesses = getWitnessesByCase(id);
  const evidence = getEvidenceByCase(id);
  const reports = getForensicReportsByCase(id);
  const auditLogs = getAuditLogsForRole(role).filter(
    (l) => l.entity === caseObj.id || evidence.some((e) => l.entity.includes(e.id)) || reports.some((r) => l.entity.includes(r.id))
  );

  return (
    <div>
      <CaseHeader
        eyebrow="Digital Investigation"
        title={caseObj.id}
        subtitle={caseObj.title}
        status={caseObj.status}
        priority={caseObj.priority}
        meta={[
          { label: "Submitted By", value: "Investigation Officer" },
          { label: "Submission Date", value: formatDate(caseObj.courtSubmissionDate) },
          { label: "Evidence Items", value: evidence.length },
          { label: "Forensic Reports", value: reports.length },
        ]}
      />

      <div style={{ marginTop: 18 }}>
        <CaseTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />
      </div>

      <div style={{ marginTop: 20 }}>
        {activeTab === "overview" && (
          <div className="card card-pad stack-y">
            <div>
              <div className="card-title" style={{ marginBottom: 8 }}>Case Summary</div>
              <p className="text-sm text-secondary" style={{ lineHeight: 1.6 }}>{caseObj.description}</p>
            </div>
            <hr className="divider" />
            <dl className="evidence-meta-grid" style={{ gridTemplateColumns: "1fr 1fr", fontSize: 12.5 }}>
              <dt>Incident Date</dt><dd>{formatDate(caseObj.incidentDate)}</dd>
              <dt>Location</dt><dd>{caseObj.incidentLocation}</dd>
              <dt>Case Number</dt><dd>{caseObj.caseNumber}</dd>
              <dt>Priority</dt><dd>{caseObj.priority}</dd>
            </dl>
          </div>
        )}

        {activeTab === "fir" && (
          <div className="card card-pad" style={{ maxWidth: 720 }}>
            {fir ? (
              <div className="stack-y">
                <dl className="evidence-meta-grid" style={{ gridTemplateColumns: "1fr 1fr", fontSize: 12.5 }}>
                  <dt>FIR Number</dt><dd>{fir.firNumber}</dd>
                  <dt>Police Station</dt><dd>{fir.policeStation}</dd>
                  <dt>Incident Date</dt><dd>{formatDate(fir.incidentDate)}</dd>
                  <dt>Complainant</dt><dd>{fir.complainant}</dd>
                </dl>
                <p className="text-sm text-secondary" style={{ lineHeight: 1.6 }}>{fir.description}</p>
                <div className="row-actions">
                  <button className="btn btn-secondary btn-sm" onClick={() => toast.info("Opening secure document preview…")}><Eye size={13} /> View Full Report</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => toast.success("Download started", fir.documentName)}><Download size={13} /> Download</button>
                </div>
              </div>
            ) : <EmptyState title="No FIR on file for this case" />}
          </div>
        )}

        {activeTab === "witnesses" && (
          witnesses.length === 0 ? <EmptyState icon={Users} title="No witness statements" /> : (
            <div className="grid-3">
              {witnesses.map((w, i) => (
                <div key={w.id} className="card card-pad">
                  <div className="text-xs text-muted uppercase" style={{ marginBottom: 4 }}>Witness #{String(i + 1).padStart(2, "0")}</div>
                  <div className="font-semibold text-md">{w.name}</div>
                  <div className="text-xs text-muted" style={{ marginBottom: 10 }}>{w.role}</div>
                  <p className="text-sm text-secondary">{w.statementText}</p>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === "evidence" && (
          evidence.length === 0 ? <EmptyState icon={Shield} title="No evidence on file" /> : (
            <div className="grid-evidence">
              {evidence.map((e) => <CourtEvidenceReview key={e.id} evidence={e} />)}
            </div>
          )
        )}

        {activeTab === "forensic" && (
          reports.length === 0 ? <EmptyState icon={Microscope} title="No forensic report submitted" /> : (
            <div className="stack-y">{reports.map((r) => <ReportViewer key={r.id} report={r} />)}</div>
          )
        )}

        {activeTab === "custody" && (
          <div className="stack-y">
            {evidence.map((e) => (
              <div key={e.id} className="card card-pad">
                <div className="font-mono font-semibold text-sm" style={{ marginBottom: 12 }}>{e.id} — {e.name}</div>
                <VerticalTimeline events={getCustody(e.id)} />
              </div>
            ))}
            {evidence.length === 0 && <EmptyState title="No custody history" />}
          </div>
        )}

        {activeTab === "audit" && <AuditLogTable logs={auditLogs} />}
      </div>
    </div>
  );
}
