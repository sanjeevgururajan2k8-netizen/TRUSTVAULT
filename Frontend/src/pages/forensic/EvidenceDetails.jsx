import { useState } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import { PackageCheck, PlayCircle, Info, History, ClipboardList, Loader2, Send } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import {
  getEvidenceById, getCustody, verifyEvidenceIntegrity, receiveEvidence, startExamination, completeExamination,
} from "../../data/api";
import CaseHeader from "../../components/domain/CaseHeader";
import CaseTabs from "../../components/domain/CaseTabs";
import HashVerification from "../../components/domain/HashVerification";
import VerticalTimeline from "../../components/domain/VerticalTimeline";
import EmptyState from "../../components/ui/EmptyState";
import NotFound from "../errors/NotFound";
import { formatDateTime } from "../../utils/helpers";

const TABS = [
  { key: "overview", label: "Overview", icon: Info },
  { key: "custody", label: "Chain of Custody", icon: History },
  { key: "examination", label: "Examination", icon: ClipboardList },
];

const METHODS = [
  "Video Frame Analysis & Metadata Verification",
  "Image Metadata & EXIF Analysis",
  "Disk Forensic Imaging & File Recovery",
  "Mobile Device Extraction Analysis",
  "Audio Authenticity & Spectral Analysis",
  "Network / Log Correlation Analysis",
];

export default function ForensicEvidenceDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [tick, setTick] = useState(0);
  const [busy, setBusy] = useState(false);

  const evidence = getEvidenceById(id);
  if (!evidence) return <NotFound />;

  const activeTab = params.get("tab") || "overview";
  const setActiveTab = (key) => setParams({ tab: key }, { replace: true });
  const custody = getCustody(id);

  const runAction = (fn, message) => {
    setBusy(true);
    window.setTimeout(() => {
      fn(id, user);
      setBusy(false);
      toast.success(message);
      setTick((t) => t + 1);
    }, 700);
  };

  return (
    <div key={tick}>
      <CaseHeader
        eyebrow={evidence.caseId}
        title={evidence.id}
        subtitle={evidence.name}
        status={evidence.status}
        meta={[
          { label: "Evidence Type", value: evidence.type },
          { label: "Uploaded By", value: evidence.uploadedBy },
          { label: "Current Holder", value: evidence.currentHolder },
          { label: "File Size", value: evidence.fileSize },
        ]}
        actions={
          <>
            <Link className="btn btn-secondary btn-sm" to={`/forensic/case-references`}>Case Reference</Link>
            {evidence.status === "Sent to Forensic" && (
              <button className="btn btn-accent btn-sm" disabled={busy} onClick={() => runAction(receiveEvidence, "Evidence accepted into custody")}>
                {busy ? <Loader2 size={14} className="spin" /> : <PackageCheck size={14} />} Accept Evidence
              </button>
            )}
            {evidence.status === "Received" && (
              <button className="btn btn-accent btn-sm" disabled={busy} onClick={() => runAction(startExamination, "Examination started")}>
                {busy ? <Loader2 size={14} className="spin" /> : <PlayCircle size={14} />} Start Examination
              </button>
            )}
            {evidence.status === "Under Examination" && (
              <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab("examination")}>
                <ClipboardList size={14} /> Continue Examination
              </button>
            )}
            {evidence.status === "Examination Completed" && (
              <Link className="btn btn-accent btn-sm" to={`/forensic/reports/new?evidence=${evidence.id}`}>
                <Send size={14} /> Generate Report
              </Link>
            )}
          </>
        }
      />

      <div style={{ marginTop: 18 }}>
        <CaseTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />
      </div>

      <div className="grid-2" style={{ marginTop: 20 }}>
        <div>
          {activeTab === "overview" && (
            <div className="card card-pad">
              <dl className="evidence-meta-grid" style={{ gridTemplateColumns: "1fr 1fr", fontSize: 12.5 }}>
                <dt>Evidence Type</dt><dd>{evidence.type}</dd>
                <dt>File Name</dt><dd className="font-mono">{evidence.fileName}</dd>
                <dt>File Size</dt><dd>{evidence.fileSize}</dd>
                <dt>Uploaded By</dt><dd>{evidence.uploadedBy}</dd>
                <dt>Upload Date</dt><dd>{formatDateTime(evidence.uploadDate)}</dd>
                <dt>Case ID</dt><dd>{evidence.caseId}</dd>
                <dt>Current Holder</dt><dd>{evidence.currentHolder}</dd>
                <dt>Current Status</dt><dd>{evidence.status}</dd>
              </dl>
            </div>
          )}

          {activeTab === "custody" && (
            <div className="card card-pad">
              {custody.length === 0 ? <EmptyState title="No custody events yet" /> : <VerticalTimeline events={custody} />}
            </div>
          )}

          {activeTab === "examination" && (
            <ExaminationPanel evidence={evidence} onSaved={() => { setTick((t) => t + 1); navigate(`/forensic/reports/new?evidence=${evidence.id}`); }} />
          )}
        </div>

        <div>
          <HashVerification evidence={evidence} onVerify={() => { verifyEvidenceIntegrity(id, user); setTick((t) => t + 1); }} />
        </div>
      </div>
    </div>
  );
}

function ExaminationPanel({ evidence, onSaved }) {
  const { user } = useAuth();
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    method: METHODS[0],
    notes: "",
    observations: "",
    findings: "",
    conclusion: "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const canEdit = evidence.status === "Under Examination";

  const submit = (e) => {
    e.preventDefault();
    setSaving(true);
    window.setTimeout(() => {
      completeExamination(evidence.id, form, user);
      setSaving(false);
      toast.success("Examination saved", "Evidence marked as Examination Completed.");
      onSaved();
    }, 900);
  };

  if (!canEdit && !evidence.examination) {
    return <EmptyState icon={ClipboardList} title="Examination not started" description="Accept the evidence and start examination before recording findings." />;
  }

  if (!canEdit && evidence.examination) {
    const ex = evidence.examination;
    return (
      <div className="card card-pad stack-y">
        <div className="card-title">Recorded Examination</div>
        <dl className="report-doc-meta" style={{ marginBottom: 0 }}>
          <div><dt>Method</dt><dd>{ex.method}</dd></div>
          <div><dt>Examined By</dt><dd>{ex.examinedBy}</dd></div>
        </dl>
        <div><div className="text-sm font-semibold" style={{ marginBottom: 4 }}>Observations</div><p className="text-sm text-secondary">{ex.observations}</p></div>
        <div><div className="text-sm font-semibold" style={{ marginBottom: 4 }}>Findings</div><p className="text-sm text-secondary">{ex.findings}</p></div>
        <div><div className="text-sm font-semibold" style={{ marginBottom: 4 }}>Conclusion</div><p className="text-sm text-secondary">{ex.conclusion}</p></div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card card-pad stack-y">
      <div className="form-section">
        <div className="form-section-title">Evidence Information</div>
        <dl className="evidence-meta-grid" style={{ gridTemplateColumns: "1fr 1fr", fontSize: 12.5 }}>
          <dt>Evidence</dt><dd>{evidence.id} — {evidence.name}</dd>
          <dt>Case</dt><dd>{evidence.caseId}</dd>
        </dl>
      </div>
      <div className="field">
        <label className="field-label">Examination Method<span className="req">*</span></label>
        <select className="select" value={form.method} onChange={set("method")}>
          {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div className="field">
        <label className="field-label">Examination Notes</label>
        <textarea className="textarea" value={form.notes} onChange={set("notes")} placeholder="Working notes during examination…" />
      </div>
      <div className="field">
        <label className="field-label">Observations<span className="req">*</span></label>
        <textarea className="textarea" required value={form.observations} onChange={set("observations")} />
      </div>
      <div className="field">
        <label className="field-label">Findings<span className="req">*</span></label>
        <textarea className="textarea" required value={form.findings} onChange={set("findings")} />
      </div>
      <div className="field">
        <label className="field-label">Conclusion<span className="req">*</span></label>
        <textarea className="textarea" required value={form.conclusion} onChange={set("conclusion")} />
      </div>
      <div className="field">
        <label className="field-label">Supporting Files</label>
        <div className="dropzone" style={{ padding: 24 }} onClick={() => toast.info("Attach analysis files", "File picker would open here.")}>
          <span className="text-xs text-muted">Click to attach supporting analysis files (optional)</span>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="btn btn-primary btn-lg" type="submit" disabled={saving}>
          {saving ? <Loader2 size={16} className="spin" /> : <ClipboardList size={16} />}
          {saving ? "Saving…" : "Save Examination"}
        </button>
      </div>
    </form>
  );
}
