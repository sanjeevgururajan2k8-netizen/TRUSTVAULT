import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderPlus, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { createCase } from "../../data/api";
import { PRIORITY_OPTIONS } from "../../data/mockData";

const EMPTY = {
  caseNumber: "",
  title: "",
  incidentDate: "",
  incidentLocation: "",
  priority: "Medium",
  description: "",
  notes: "",
};

export default function CaseCreate() {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      const created = createCase(form, user);
      setSubmitting(false);
      toast.success("Case created successfully", `Case ID: ${created.id}`);
      navigate(`/investigation/cases/${created.id}`);
    }, 700);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">New Investigation</div>
          <h1 className="page-title">Create Case</h1>
          <p className="page-desc">Open a new investigation record and generate its unique Case ID.</p>
        </div>
      </div>

      <form onSubmit={submit} className="card card-pad" style={{ maxWidth: 780 }}>
        <div className="stack-y">
          <div className="form-section">
            <div className="form-section-title">Case Information</div>
            <div className="form-grid">
              <div className="field">
                <label className="field-label">Case Number<span className="req">*</span></label>
                <input className="input" required placeholder="FIR/2026/CYB/00XXX" value={form.caseNumber} onChange={set("caseNumber")} />
              </div>
              <div className="field">
                <label className="field-label">Case Priority<span className="req">*</span></label>
                <select className="select" value={form.priority} onChange={set("priority")}>
                  {PRIORITY_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="field" style={{ gridColumn: "1 / -1" }}>
                <label className="field-label">Case Title<span className="req">*</span></label>
                <input className="input" required placeholder="e.g. Cyber Crime Investigation — Online Banking Fraud" value={form.title} onChange={set("title")} />
              </div>
              <div className="field">
                <label className="field-label">Incident Date<span className="req">*</span></label>
                <input className="input" type="date" required value={form.incidentDate} onChange={set("incidentDate")} />
              </div>
              <div className="field">
                <label className="field-label">Incident Location<span className="req">*</span></label>
                <input className="input" required placeholder="Locality, City, State" value={form.incidentLocation} onChange={set("incidentLocation")} />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">Incident Details</div>
            <div className="field">
              <label className="field-label">Description<span className="req">*</span></label>
              <textarea className="textarea" required placeholder="Describe the incident as reported…" value={form.description} onChange={set("description")} />
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">Initial Investigation Notes</div>
            <div className="field">
              <label className="field-label">Notes</label>
              <textarea className="textarea" placeholder="Preliminary observations, leads, or next steps…" value={form.notes} onChange={set("notes")} />
            </div>
          </div>

          <div className="flex justify-between items-center" style={{ marginTop: 4 }}>
            <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
              {submitting ? <Loader2 size={16} className="spin" /> : <FolderPlus size={16} />}
              {submitting ? "Creating Case…" : "Create Case"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
