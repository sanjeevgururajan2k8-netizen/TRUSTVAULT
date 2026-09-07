import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Save, CheckCircle2, Send, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { getForensicWorkQueue, getEvidenceById, submitForensicReport } from "../../data/api";

export default function ReportCreate() {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const eligible = getForensicWorkQueue().filter((e) => e.status === "Examination Completed");
  const preselected = params.get("evidence");
  const [evidenceId, setEvidenceId] = useState(preselected || eligible[0]?.id || "");
  const evidence = getEvidenceById(evidenceId);
  const exam = evidence?.examination;

  const [form, setForm] = useState({
    method: exam?.method || "",
    observations: exam?.observations || "",
    findings: exam?.findings || "",
    conclusion: exam?.conclusion || "",
  });
  const [finalized, setFinalized] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSelectEvidence = (id) => {
    setEvidenceId(id);
    const ev = getEvidenceById(id);
    setForm({
      method: ev?.examination?.method || "",
      observations: ev?.examination?.observations || "",
      findings: ev?.examination?.findings || "",
      conclusion: ev?.examination?.conclusion || "",
    });
    setFinalized(false);
  };

  const saveDraft = () => toast.info("Draft saved", "Your progress has been saved locally.");
  const finalize = () => {
    setFinalized(true);
    toast.success("Report finalized", "Ready to submit to the Investigation Officer.");
  };

  const submitReport = () => {
    if (!evidence) return;
    setSubmitting(true);
    window.setTimeout(() => {
      const report = submitForensicReport(evidence.caseId, [evidence.id], form, user);
      setSubmitting(false);
      toast.success("Forensic report submitted", `${report.id} delivered to the Investigation Officer.`);
      navigate(`/forensic/reports/${report.id}`);
    }, 900);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Laboratory Output</div>
          <h1 className="page-title">Generate Forensic Report</h1>
          <p className="page-desc">Compile examination findings into a formal report for the Investigation Officer.</p>
        </div>
      </div>

      <div className="card card-pad stack-y" style={{ maxWidth: 780 }}>
        <div className="field">
          <label className="field-label">Evidence Examined<span className="req">*</span></label>
          <select className="select" value={evidenceId} onChange={(e) => onSelectEvidence(e.target.value)}>
            <option value="">Select examined evidence…</option>
            {eligible.map((e) => <option key={e.id} value={e.id}>{e.id} — {e.name} ({e.caseId})</option>)}
          </select>
        </div>

        {!evidence ? (
          <p className="text-sm text-muted">Select an evidence item whose examination has been completed to continue.</p>
        ) : (
          <>
            <dl className="report-doc-meta" style={{ marginBottom: 0 }}>
              <div><dt>Case ID</dt><dd>{evidence.caseId}</dd></div>
              <div><dt>Examiner</dt><dd>{user.name}</dd></div>
            </dl>
            <div className="field">
              <label className="field-label">Examination Method<span className="req">*</span></label>
              <input className="input" required value={form.method} onChange={set("method")} />
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

            <div className="flex justify-end gap-10 flex-wrap">
              <button className="btn btn-secondary" onClick={saveDraft}><Save size={14} /> Save Draft</button>
              <button className="btn btn-secondary" onClick={finalize}><CheckCircle2 size={14} /> Finalize Report</button>
              <button className="btn btn-accent" onClick={submitReport} disabled={!finalized || submitting}>
                {submitting ? <Loader2 size={14} className="spin" /> : <Send size={14} />}
                {submitting ? "Submitting…" : "Submit Report"}
              </button>
            </div>
            {!finalized && <p className="text-xs text-muted" style={{ textAlign: "right" }}>Finalize the report before it can be submitted.</p>}
          </>
        )}
      </div>
    </div>
  );
}
