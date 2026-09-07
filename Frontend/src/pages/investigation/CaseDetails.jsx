import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import {
  Info, FileText, Users, Shield, Microscope, FolderOpen, GitCommitVertical, History,
  Plus, Bot, PackageCheck, Scale, Eye, Loader2, UserPlus,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import {
  getCaseById, getFirByCase, getWitnessesByCase, getEvidenceByCase, getForensicReportsByCase, getAuditLogsForRole,
} from "../../data/api";
import { addFir, addWitness } from "../../data/api";
import CaseHeader from "../../components/domain/CaseHeader";
import CaseTabs from "../../components/domain/CaseTabs";
import ProgressChecklist from "../../components/domain/ProgressChecklist";
import EvidenceCard from "../../components/domain/EvidenceCard";
import DocumentCard from "../../components/domain/DocumentCard";
import ReportViewer from "../../components/domain/ReportViewer";
import VerticalTimeline from "../../components/domain/VerticalTimeline";
import AuditLogTable from "../../components/domain/AuditLogTable";
import EmptyState from "../../components/ui/EmptyState";
import StatusBadge from "../../components/ui/StatusBadge";
import Modal from "../../components/ui/Modal";
import { formatDate, formatDateTime } from "../../utils/helpers";
import { buildCaseTimeline } from "../../utils/buildCaseTimeline";
import NotFound from "../errors/NotFound";

const TABS = [
  { key: "overview", label: "Overview", icon: Info },
  { key: "fir", label: "FIR", icon: FileText },
  { key: "witnesses", label: "Witnesses", icon: Users },
  { key: "evidence", label: "Evidence", icon: Shield },
  { key: "forensic", label: "Forensic", icon: Microscope },
  { key: "documents", label: "Documents", icon: FolderOpen },
  { key: "timeline", label: "Timeline", icon: GitCommitVertical },
  { key: "audit", label: "Audit Trail", icon: History },
];

export default function CaseDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [refreshTick, setRefreshTick] = useState(0);
  const [witnessModalOpen, setWitnessModalOpen] = useState(false);

  const caseObj = getCaseById(id);
  const activeTab = params.get("tab") || "overview";
  const setActiveTab = (key) => setParams({ tab: key }, { replace: true });

  const refresh = () => setRefreshTick((t) => t + 1);

  if (!caseObj) return <NotFound />;

  const fir = getFirByCase(caseObj.id);
  const witnesses = getWitnessesByCase(caseObj.id);
  const evidence = getEvidenceByCase(caseObj.id);
  const reports = getForensicReportsByCase(caseObj.id);
  const caseAuditLogs = getAuditLogsForRole(user.role).filter(
    (l) =>
      l.entity === caseObj.id ||
      evidence.some((e) => l.entity.includes(e.id)) ||
      reports.some((r) => l.entity.includes(r.id)) ||
      (fir && l.entity === fir.id)
  );

  return (
    <div key={refreshTick}>
      <CaseHeader
        eyebrow={caseObj.caseNumber}
        title={caseObj.id}
        subtitle={caseObj.title}
        status={caseObj.status}
        priority={caseObj.priority}
        meta={[
          { label: "Investigation Officer", value: user.name },
          { label: "Created", value: formatDate(caseObj.createdDate) },
          { label: "Incident Date", value: formatDate(caseObj.incidentDate) },
          { label: "Evidence Items", value: evidence.length },
        ]}
        actions={
          <>
            <Link className="btn btn-secondary btn-sm" to={`/investigation/evidence/upload?case=${caseObj.id}`}>
              <Plus size={14} /> Add Evidence
            </Link>
            <Link className="btn btn-secondary btn-sm" to={`/investigation/ai-assistant?case=${caseObj.id}`}>
              <Bot size={14} /> Ask AI
            </Link>
            <Link className="btn btn-secondary btn-sm" to={`/investigation/cases/${caseObj.id}/prepare`}>
              <PackageCheck size={14} /> Prepare Case
            </Link>
            {!caseObj.submittedToCourt && (
              <Link className="btn btn-accent btn-sm" to={`/investigation/cases/${caseObj.id}/prepare`}>
                <Scale size={14} /> Submit to Court
              </Link>
            )}
          </>
        }
      />

      <div style={{ marginTop: 18 }}>
        <CaseTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />
      </div>

      <div style={{ marginTop: 20 }}>
        {activeTab === "overview" && (
          <div className="grid-2">
            <div className="card card-pad stack-y">
              <div>
                <div className="card-title" style={{ marginBottom: 8 }}>Case Summary</div>
                <p className="text-sm text-secondary" style={{ lineHeight: 1.6 }}>{caseObj.description}</p>
              </div>
              <hr className="divider" />
              <div>
                <div className="card-title" style={{ marginBottom: 8 }}>Incident Details</div>
                <dl className="evidence-meta-grid" style={{ gridTemplateColumns: "1fr 1fr", fontSize: 12.5 }}>
                  <dt>Incident Date</dt><dd>{formatDate(caseObj.incidentDate)}</dd>
                  <dt>Location</dt><dd>{caseObj.incidentLocation}</dd>
                  <dt>Priority</dt><dd>{caseObj.priority}</dd>
                  <dt>Current Status</dt><dd>{caseObj.status}</dd>
                </dl>
              </div>
              {caseObj.notes && (
                <>
                  <hr className="divider" />
                  <div>
                    <div className="card-title" style={{ marginBottom: 8 }}>Investigation Notes</div>
                    <p className="text-sm text-secondary" style={{ lineHeight: 1.6 }}>{caseObj.notes}</p>
                  </div>
                </>
              )}
            </div>

            <div className="card card-pad">
              <div className="card-title" style={{ marginBottom: 14 }}>Investigation Progress</div>
              <ProgressChecklist
                items={[
                  { label: "Case Created", done: caseObj.progress.caseCreated },
                  { label: "FIR Added", done: caseObj.progress.firAdded },
                  { label: "Evidence Collected", done: caseObj.progress.evidenceCollected },
                  { label: "Forensic Examination", done: caseObj.progress.forensicExamination },
                  { label: "Forensic Report", done: caseObj.progress.forensicReport },
                  { label: "Court Submission", done: caseObj.progress.courtSubmission },
                ]}
              />
            </div>
          </div>
        )}

        {activeTab === "fir" && (
          <div className="card card-pad" style={{ maxWidth: 720 }}>
            {fir ? (
              <div className="stack-y">
                <div className="card-title">FIR Information</div>
                <dl className="evidence-meta-grid" style={{ gridTemplateColumns: "1fr 1fr", fontSize: 12.5 }}>
                  <dt>FIR Number</dt><dd>{fir.firNumber}</dd>
                  <dt>Police Station</dt><dd>{fir.policeStation}</dd>
                  <dt>Incident Date</dt><dd>{formatDate(fir.incidentDate)}</dd>
                  <dt>Complainant</dt><dd>{fir.complainant}</dd>
                  <dt>Officer</dt><dd>{fir.officer}</dd>
                  <dt>Filed</dt><dd>{formatDate(fir.filedDate)}</dd>
                </dl>
                <div>
                  <div className="text-sm font-semibold" style={{ marginBottom: 6 }}>Description</div>
                  <p className="text-sm text-secondary" style={{ lineHeight: 1.6 }}>{fir.description}</p>
                </div>
                <DocumentCard
                  title="FIR Document"
                  fileName={fir.documentName}
                  date={fir.filedDate}
                  onView={() => toast.info("Opening secure document preview…")}
                  onDownload={() => toast.success("Download started", fir.documentName)}
                  onReplace={() => toast.info("Replace document flow would open a file picker here.")}
                />
              </div>
            ) : (
              <AddFirForm caseId={caseObj.id} user={user} onDone={refresh} />
            )}
          </div>
        )}

        {activeTab === "witnesses" && (
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: 14 }}>
              <span className="text-sm text-muted">{witnesses.length} witness statement{witnesses.length !== 1 ? "s" : ""} recorded</span>
              <button className="btn btn-primary btn-sm" onClick={() => setWitnessModalOpen(true)}>
                <UserPlus size={14} /> Add Witness Statement
              </button>
            </div>
            {witnesses.length === 0 ? (
              <EmptyState icon={Users} title="No witness statements yet" description="Statements added to this case will appear here." />
            ) : (
              <div className="grid-3">
                {witnesses.map((w, i) => (
                  <div key={w.id} className="card card-pad">
                    <div className="text-xs text-muted font-semibold uppercase" style={{ marginBottom: 4 }}>Witness #{String(i + 1).padStart(2, "0")}</div>
                    <div className="font-semibold text-md">{w.name}</div>
                    <div className="text-xs text-muted" style={{ marginBottom: 8 }}>{w.role}</div>
                    <div className="flex items-center gap-8" style={{ marginBottom: 10 }}>
                      <StatusBadge status={w.status} />
                      <span className="text-xs text-muted">{formatDate(w.statementDate)}</span>
                    </div>
                    <div className="row-actions">
                      <button className="btn btn-secondary btn-sm" onClick={() => toast.info(`Statement — ${w.name}`, w.statementText.slice(0, 80) + "…")}>
                        <Eye size={13} /> View Statement
                      </button>
                      <button className="btn btn-ghost btn-sm" disabled={!w.summaryAvailable} onClick={() => toast.info("AI Summary", "Statement summarized — verify against original record.")}>
                        <Bot size={13} /> AI Summary
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Modal
              open={witnessModalOpen}
              onClose={() => setWitnessModalOpen(false)}
              title="Add Witness Statement"
              footer={<WitnessFormFooter caseId={caseObj.id} user={user} onDone={() => { setWitnessModalOpen(false); refresh(); }} onCancel={() => setWitnessModalOpen(false)} />}
            >
              <WitnessForm id="witness-form" caseId={caseObj.id} user={user} onSubmitDone={() => { setWitnessModalOpen(false); refresh(); }} />
            </Modal>
          </div>
        )}

        {activeTab === "evidence" && (
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: 14 }}>
              <span className="text-sm text-muted">{evidence.length} evidence item{evidence.length !== 1 ? "s" : ""} associated with this case</span>
              <Link className="btn btn-primary btn-sm" to={`/investigation/evidence/upload?case=${caseObj.id}`}>
                <Plus size={14} /> Add Evidence
              </Link>
            </div>
            {evidence.length === 0 ? (
              <EmptyState icon={Shield} title="No evidence uploaded yet" description="Digital evidence uploaded for this case will appear here." />
            ) : (
              <div className="grid-evidence">
                {evidence.map((e) => (
                  <EvidenceCard key={e.id} evidence={e} viewHref={`/investigation/evidence/${e.id}`} showCase={false} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "forensic" && (
          <div>
            {reports.length === 0 ? (
              <EmptyState
                icon={Microscope}
                title="No forensic reports yet"
                description="Forensic reports submitted for this case will appear here."
                action={<Link className="btn btn-secondary btn-sm" to={`/investigation/evidence?case=${caseObj.id}`}>View Evidence</Link>}
              />
            ) : (
              <div className="stack-y">
                {reports.map((r) => (
                  <div key={r.id} className="card card-pad">
                    <div className="flex justify-between items-center flex-wrap gap-8" style={{ marginBottom: 12 }}>
                      <span className="font-mono font-semibold text-sm">{r.id}</span>
                      <StatusBadge status={r.status} />
                    </div>
                    <ReportViewer report={r} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "documents" && (
          <div className="stack-y">
            {fir && (
              <DocumentCard
                title="First Information Report"
                fileName={fir.documentName}
                date={fir.filedDate}
                onView={() => toast.info("Opening secure document preview…")}
                onDownload={() => toast.success("Download started", fir.documentName)}
              />
            )}
            {evidence.map((e) => (
              <DocumentCard
                key={e.id}
                title={e.name}
                fileName={e.fileName}
                date={e.uploadDate}
                dateLabel="Uploaded"
                onView={() => navigate(`/investigation/evidence/${e.id}`)}
                onDownload={() => toast.success("Download started", e.fileName)}
              />
            ))}
            {reports.map((r) => (
              <DocumentCard
                key={r.id}
                title={`Forensic Report — ${r.id}`}
                fileName={`${r.id}.pdf`}
                date={r.date}
                dateLabel="Submitted"
                onView={() => setActiveTab("forensic")}
                onDownload={() => toast.success("Download started", `${r.id}.pdf`)}
              />
            ))}
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="card card-pad" style={{ maxWidth: 720 }}>
            <VerticalTimeline events={buildCaseTimeline(caseObj)} />
          </div>
        )}

        {activeTab === "audit" && <AuditLogTable logs={caseAuditLogs} showRoleFilter={false} />}
      </div>
    </div>
  );
}

function AddFirForm({ caseId, user, onDone }) {
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ firNumber: "", policeStation: "", incidentDate: "", complainant: "", description: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSaving(true);
    window.setTimeout(() => {
      addFir(caseId, form, user);
      setSaving(false);
      toast.success("FIR added and linked to case");
      onDone();
    }, 600);
  };

  return (
    <form onSubmit={submit} className="stack-y">
      <div className="card-title">Add FIR</div>
      <div className="form-grid">
        <div className="field">
          <label className="field-label">FIR Number<span className="req">*</span></label>
          <input className="input" required value={form.firNumber} onChange={set("firNumber")} placeholder="FIR/2026/CYB/00XXX" />
        </div>
        <div className="field">
          <label className="field-label">Police Station<span className="req">*</span></label>
          <input className="input" required value={form.policeStation} onChange={set("policeStation")} />
        </div>
        <div className="field">
          <label className="field-label">Incident Date<span className="req">*</span></label>
          <input className="input" type="date" required value={form.incidentDate} onChange={set("incidentDate")} />
        </div>
        <div className="field">
          <label className="field-label">Complainant<span className="req">*</span></label>
          <input className="input" required value={form.complainant} onChange={set("complainant")} />
        </div>
      </div>
      <div className="field">
        <label className="field-label">Description<span className="req">*</span></label>
        <textarea className="textarea" required value={form.description} onChange={set("description")} />
      </div>
      <div className="flex justify-end">
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? <Loader2 size={14} className="spin" /> : <FileText size={14} />}
          {saving ? "Saving…" : "Add FIR"}
        </button>
      </div>
    </form>
  );
}

function WitnessForm({ id, caseId, user, onSubmitDone }) {
  const [form, setForm] = useState({ name: "", role: "", statementText: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    addWitness(caseId, form, user);
    onSubmitDone();
  };

  return (
    <form id={id} onSubmit={submit} className="stack-y">
      <div className="field">
        <label className="field-label">Witness Name<span className="req">*</span></label>
        <input className="input" required value={form.name} onChange={set("name")} />
      </div>
      <div className="field">
        <label className="field-label">Role / Relation to Case<span className="req">*</span></label>
        <input className="input" required placeholder="e.g. Complainant, Bystander" value={form.role} onChange={set("role")} />
      </div>
      <div className="field">
        <label className="field-label">Statement<span className="req">*</span></label>
        <textarea className="textarea" required value={form.statementText} onChange={set("statementText")} />
      </div>
    </form>
  );
}

function WitnessFormFooter({ onCancel }) {
  return (
    <>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      <button type="submit" form="witness-form" className="btn btn-primary"><UserPlus size={14} /> Save Statement</button>
    </>
  );
}
