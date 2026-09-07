import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { getCasesForUser, addEvidence, getAllEvidence } from "../../data/api";
import { EVIDENCE_TYPES } from "../../data/mockData";
import FileUploader from "../../components/domain/FileUploader";
import { nextEvidenceId } from "../../utils/helpers";

export default function EvidenceUpload() {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const cases = getCasesForUser(user);

  const [caseId, setCaseId] = useState(params.get("case") || cases[0]?.id || "");
  const [type, setType] = useState(EVIDENCE_TYPES[0]);
  const [name, setName] = useState("");
  const [fileMeta, setFileMeta] = useState(null);
  const [saved, setSaved] = useState(null);

  const previewId = nextEvidenceId(Object.keys(getAllEvidence().reduce((acc, e) => ({ ...acc, [e.id]: true }), {})));

  const handleComplete = (meta) => setFileMeta(meta);

  const saveEvidence = () => {
    const record = addEvidence(caseId, { ...fileMeta, name: name || fileMeta.file.name, type }, user);
    setSaved(record);
    toast.success("Evidence uploaded successfully", `Evidence ID: ${record.id}`);
  };

  if (saved) {
    return (
      <div>
        <div className="page-header">
          <div>
            <div className="page-eyebrow">Evidence Secured</div>
            <h1 className="page-title">Upload Complete</h1>
          </div>
        </div>
        <div className="card card-pad stack-y" style={{ maxWidth: 560 }}>
          <div className="integrity-banner ok">
            <CheckCircle2 size={20} />
            <div>
              <div className="integrity-banner-title">Evidence secured &amp; fingerprinted</div>
              <div className="integrity-banner-desc">
                {saved.id} has been added to {saved.caseId} with a verified SHA-256 fingerprint and initial chain-of-custody record.
              </div>
            </div>
          </div>
          <div className="row-actions">
            <button className="btn btn-primary" onClick={() => navigate(`/investigation/evidence/${saved.id}`)}>
              View Evidence <ArrowRight size={14} />
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(`/investigation/cases/${saved.caseId}?tab=evidence`)}>
              Back to Case
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Digital Evidence Management</div>
          <h1 className="page-title">Upload Digital Evidence</h1>
          <p className="page-desc">New evidence will be assigned ID <b className="font-mono">{previewId}</b> and fingerprinted automatically.</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card card-pad stack-y">
          <div className="form-grid">
            <div className="field">
              <label className="field-label">Case<span className="req">*</span></label>
              <select className="select" value={caseId} onChange={(e) => setCaseId(e.target.value)}>
                {cases.map((c) => <option key={c.id} value={c.id}>{c.id} — {c.title}</option>)}
              </select>
            </div>
            <div className="field">
              <label className="field-label">Evidence Type<span className="req">*</span></label>
              <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
                {EVIDENCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label className="field-label">Evidence Name / Description</label>
              <input className="input" placeholder="e.g. ATM CCTV Footage — Linking Road Branch" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>

          <FileUploader onComplete={handleComplete} evidenceId={previewId} />

          {fileMeta && (
            <button className="btn btn-primary btn-block btn-lg" onClick={saveEvidence}>
              Save Evidence to Case
            </button>
          )}
        </div>

        <div className="card card-pad">
          <div className="card-title" style={{ marginBottom: 10 }}>What happens on upload?</div>
          <ol className="stack-y" style={{ fontSize: 12.5, color: "var(--text-secondary)", paddingLeft: 18, listStyle: "decimal" }}>
            <li>A unique Evidence ID is generated and linked to the selected case.</li>
            <li>The file is secured in encrypted evidence storage.</li>
            <li>A SHA-256 fingerprint is generated for future integrity verification.</li>
            <li>Metadata (uploader, timestamp, case) is recorded in the chain of custody.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
