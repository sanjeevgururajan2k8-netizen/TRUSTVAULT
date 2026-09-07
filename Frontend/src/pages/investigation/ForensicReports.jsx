import { Link } from "react-router-dom";
import { Microscope, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getCasesForUser, getForensicReportsByCase } from "../../data/api";
import EmptyState from "../../components/ui/EmptyState";
import StatusBadge from "../../components/ui/StatusBadge";
import { formatDateTime } from "../../utils/helpers";

export default function InvestigationForensicReports() {
  const { user } = useAuth();
  const cases = getCasesForUser(user);
  const reports = cases.flatMap((c) => getForensicReportsByCase(c.id).map((r) => ({ ...r, caseTitle: c.title })));

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Forensic Coordination</div>
          <h1 className="page-title">Forensic Reports</h1>
          <p className="page-desc">Reports returned by the Digital Forensics Laboratory for your cases.</p>
        </div>
      </div>

      {reports.length === 0 ? (
        <EmptyState icon={Microscope} title="No forensic reports yet" description="Reports submitted by forensic officers will appear here." />
      ) : (
        <div className="stack-y">
          {reports.map((r) => (
            <div key={r.id} className="card card-pad flex items-center justify-between gap-16 flex-wrap">
              <div className="flex items-center gap-14">
                <div className="evidence-type-icon" style={{ background: "var(--status-green-bg)", color: "var(--status-green)" }}>
                  <Microscope size={20} />
                </div>
                <div>
                  <div className="font-semibold text-md">{r.id}</div>
                  <div className="text-xs text-muted">{r.caseId} · {r.caseTitle}</div>
                  <div className="text-xs text-muted" style={{ marginTop: 2 }}>Examiner: {r.examiner} · Submitted {formatDateTime(r.date)}</div>
                </div>
              </div>
              <div className="flex items-center gap-10">
                <StatusBadge status={r.status} />
                <Link className="btn btn-secondary btn-sm" to={`/investigation/cases/${r.caseId}?tab=forensic`}>
                  Review Report <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
