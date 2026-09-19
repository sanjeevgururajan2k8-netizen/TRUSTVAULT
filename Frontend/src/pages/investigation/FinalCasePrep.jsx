import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { PackageCheck, Scale, Eye, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import {
  getCaseById, getFirByCase, getWitnessesByCase, getEvidenceByCase, getForensicReportsByCase, submitCaseToCourt,
} from "../../data/api";
import ProgressChecklist from "../../components/domain/ProgressChecklist";
import Modal from "../../components/ui/Modal";
import NotFound from "../errors/NotFound";
import { formatDate } from "../../utils/helpers";

export default function FinalCasePrep() {
  const { id } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const caseObj = getCaseById(id);

  // Track submission status in local state so the UI updates correctly after
  // the user clicks "Confirm Submission". Initialise from the (already
  // hydrated) mock store so a page-refresh also shows the correct state.
  const [isSubmitted, setIsSubmitted] = useState(!!caseObj?.submittedToCourt);
  const [submissionDate, setSubmissionDate] = useState(caseObj?.courtSubmissionDate ?? null);

  if (!caseObj) return <NotFound />;

  const fir = getFirByCase(id);
  const witnesses = getWitnessesByCase(id);
  const evidence = getEvidenceByCase(id);
  const reports = getForensicReportsByCase(id);
  const evidenceWithHash = evidence.filter((e) => e.hashOriginal !== "—");
  const custodyComplete = evidence.every((e) => e.status !== "Created");

  const checklist = [
    { label: "FIR", done: !!fir },
    { label: "Witness Statements", done: witnesses.length > 0 },
    { label: "Evidence", done: evidence.length > 0 },
    { label: "Evidence Hashes", done: evidenceWithHash.length === evidence.length && evidence.length > 0 },
    { label: "Chain of Custody", done: custodyComplete && evidence.length > 0 },
    { label: "Forensic Report", done: reports.length > 0 },
    { label: "Investigation Documents", done: !!caseObj.notes },
  ];
  const doneCount = checklist.filter((c) => c.done).length;
  const pct = Math.round((doneCount / checklist.length) * 100);
  const missing = checklist.filter((c) => !c.done);
  const readyToSubmit = pct === 100 && !isSubmitted;

  const confirmSubmit = () => {
    setSubmitting(true);
    window.setTimeout(() => {
      const updated = submitCaseToCourt(id, user);
      setSubmitting(false);
      setConfirmOpen(false);
      if (updated) {
        setIsSubmitted(true);
        setSubmissionDate(updated.courtSubmissionDate);
      }
      toast.success("Case submitted for judicial review", `${id} sent to the Court Justice.`);
    }, 900);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">{caseObj.id}</div>
          <h1 className="page-title">Prepare Final Case File</h1>
          <p className="page-desc">Compile every required record before submitting {caseObj.title} to the Court Justice.</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card card-pad">
          <div className="card-title" style={{ marginBottom: 4 }}>Case Completeness</div>
          <p className="text-xs text-muted" style={{ marginBottom: 16 }}>All items below must be complete before the case can be submitted to court.</p>
          <ProgressChecklist items={checklist} showPercent />

          {missing.length > 0 && (
            <div style={{ marginTop: 18 }}>
              <div className="text-xs font-semibold text-muted uppercase" style={{ marginBottom: 6 }}>Missing</div>
              <ul className="stack-y">
                {missing.map((m) => (
                  <li key={m.label} className="text-sm" style={{ color: "var(--status-amber)" }}>○ {m.label}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex-col gap-16">
          <div className="card card-pad">
            <div className="card-title" style={{ marginBottom: 12 }}>Case Package Contents</div>
            <ul className="stack-y text-sm">
              <li>FIR: {fir ? fir.firNumber : "Not yet added"}</li>
              <li>Witness Statements: {witnesses.length}</li>
              <li>Evidence Items: {evidence.length}</li>
              <li>Forensic Reports: {reports.length}</li>
              {isSubmitted && <li className="font-semibold" style={{ color: "var(--status-green)" }}>Submitted: {formatDate(submissionDate)}</li>}
            </ul>
          </div>

          <div className="card card-pad stack-y">
            <Link className="btn btn-secondary btn-block" to={`/investigation/cases/${id}`}>
              <Eye size={15} /> Review Case
            </Link>
            <button
              className="btn btn-secondary btn-block"
              onClick={() => toast.info("Case package generated", "A consolidated PDF bundle would be produced by the backend.")}
            >
              <PackageCheck size={15} /> Generate Case Package
            </button>
            {isSubmitted ? (
              <div className="integrity-banner ok" style={{ marginTop: 4 }}>
                <CheckCircle2 size={18} />
                <div>
                  <div className="integrity-banner-title">Submitted to Court</div>
                  <div className="integrity-banner-desc">Awaiting judicial review by the Court Justice.</div>
                </div>
              </div>
            ) : (
              <button className="btn btn-accent btn-block btn-lg" disabled={!readyToSubmit} onClick={() => setConfirmOpen(true)}>
                <Scale size={15} /> Submit to Court
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Submit Case to Court"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setConfirmOpen(false)}>Cancel</button>
            <button className="btn btn-accent" onClick={confirmSubmit} disabled={submitting}>
              {submitting ? <Loader2 size={14} className="spin" /> : <Scale size={14} />}
              {submitting ? "Submitting…" : "Confirm Submission"}
            </button>
          </>
        }
      >
        <p className="text-sm text-secondary">
          You are about to submit <b>{caseObj.id}</b> — {caseObj.title} — for judicial review. This action is recorded
          in the audit trail and the case will become read-only for further evidence changes.
        </p>
      </Modal>
    </div>
  );
}
