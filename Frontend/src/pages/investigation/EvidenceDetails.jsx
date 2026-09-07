import { useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { ArrowRightLeft, Info, History, FileBox } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getEvidenceById, getCustody, verifyEvidenceIntegrity, getForensicReportByEvidence } from "../../data/api";
import CaseHeader from "../../components/domain/CaseHeader";
import CaseTabs from "../../components/domain/CaseTabs";
import HashVerification from "../../components/domain/HashVerification";
import VerticalTimeline from "../../components/domain/VerticalTimeline";
import ReportViewer from "../../components/domain/ReportViewer";
import SubmitToForensicModal from "../../components/domain/SubmitToForensicModal";
import EmptyState from "../../components/ui/EmptyState";
import { formatDateTime } from "../../utils/helpers";
import NotFound from "../errors/NotFound";

const TABS = [
  { key: "overview", label: "Overview", icon: Info },
  { key: "custody", label: "Chain of Custody", icon: History },
  { key: "forensic", label: "Forensic Report", icon: FileBox },
];

export default function InvestigationEvidenceDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [tick, setTick] = useState(0);

  const evidence = getEvidenceById(id);
  if (!evidence) return <NotFound />;

  const activeTab = params.get("tab") || "overview";
  const setActiveTab = (key) => setParams({ tab: key }, { replace: true });
  const custody = getCustody(id);
  const report = getForensicReportByEvidence(id);

  const canSubmit = ["Uploaded", "Created"].includes(evidence.status);

  return (
    <div key={tick}>
      <CaseHeader
        eyebrow={evidence.caseId}
        title={evidence.id}
        subtitle={evidence.name}
        status={evidence.status}
        meta={[
          { label: "Evidence Type", value: evidence.type },
          { label: "File Size", value: evidence.fileSize },
          { label: "Uploaded By", value: evidence.uploadedBy },
          { label: "Current Holder", value: evidence.currentHolder },
        ]}
        actions={
          <>
            <Link className="btn btn-secondary btn-sm" to={`/investigation/cases/${evidence.caseId}`}>View Case</Link>
            {canSubmit && (
              <button className="btn btn-accent btn-sm" onClick={() => setModalOpen(true)}>
                <ArrowRightLeft size={14} /> Submit to Forensic
              </button>
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
            <div className="card card-pad stack-y">
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
              {custody.length === 0 ? (
                <EmptyState title="No custody events yet" description="Custody history will appear once this evidence is transferred." />
              ) : (
                <VerticalTimeline events={custody} />
              )}
            </div>
          )}

          {activeTab === "forensic" && (
            report ? <ReportViewer report={report} /> : (
              <EmptyState
                icon={FileBox}
                title="No forensic report yet"
                description="A forensic report will appear here once the examining officer submits it."
              />
            )
          )}
        </div>

        <div>
          <HashVerification evidence={evidence} onVerify={() => { verifyEvidenceIntegrity(id, user); setTick((t) => t + 1); }} />
        </div>
      </div>

      <SubmitToForensicModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        evidence={evidence}
        onDone={() => setTick((t) => t + 1)}
      />
    </div>
  );
}
