import { useState } from "react";
import { Loader2, ArrowRightLeft } from "lucide-react";
import Modal from "../ui/Modal";
import { submitEvidenceToForensic } from "../../data/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const FORENSIC_OFFICERS = ["Dr. Rakesh Verma — Digital Forensics Laboratory", "Kavya Nair — Digital Forensics Laboratory"];

export default function SubmitToForensicModal({ open, onClose, evidence, onDone }) {
  const { user } = useAuth();
  const toast = useToast();
  const [assignTo, setAssignTo] = useState(FORENSIC_OFFICERS[0]);
  const [purpose, setPurpose] = useState("Digital forensic examination");
  const [submitting, setSubmitting] = useState(false);

  if (!evidence) return null;

  const confirm = () => {
    setSubmitting(true);
    window.setTimeout(() => {
      submitEvidenceToForensic(evidence.id, assignTo, purpose, user);
      setSubmitting(false);
      onClose();
      toast.success("Evidence transferred successfully", "Chain-of-custody record created.");
      onDone?.();
    }, 800);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Submit Evidence"
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-accent" onClick={confirm} disabled={submitting}>
            {submitting ? <Loader2 size={14} className="spin" /> : <ArrowRightLeft size={14} />}
            {submitting ? "Transferring…" : "Confirm Transfer"}
          </button>
        </>
      }
    >
      <div className="stack-y">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Evidence</span>
          <span className="font-mono font-semibold">{evidence.id}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Case</span>
          <span className="font-mono font-semibold">{evidence.caseId}</span>
        </div>
        <div className="field">
          <label className="field-label">Assign To</label>
          <select className="select" value={assignTo} onChange={(e) => setAssignTo(e.target.value)}>
            {FORENSIC_OFFICERS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="field">
          <label className="field-label">Purpose</label>
          <input className="input" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
        </div>
      </div>
    </Modal>
  );
}
