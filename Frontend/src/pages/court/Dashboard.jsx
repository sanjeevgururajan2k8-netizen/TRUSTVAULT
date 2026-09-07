import { Link } from "react-router-dom";
import { Scale, Gavel, Shield, FileCheck2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getSubmittedCourtCases, getEvidenceByCase, getForensicReportsByCase } from "../../data/api";
import KpiCard from "../../components/domain/KpiCard";
import DataTable from "../../components/data/DataTable";
import StatusBadge, { IntegrityBadge } from "../../components/ui/StatusBadge";
import { formatDate } from "../../utils/helpers";

export default function CourtDashboard() {
  const { user } = useAuth();
  const cases = getSubmittedCourtCases();
  const underReview = cases.filter((c) => c.status !== "Closed");
  const evidenceCount = cases.reduce((sum, c) => sum + getEvidenceByCase(c.id).length, 0);
  const reportsReviewed = cases.reduce((sum, c) => sum + getForensicReportsByCase(c.id).length, 0);

  const columns = [
    { key: "id", header: "Case ID", render: (r) => <Link className="font-mono font-semibold text-sm" to={`/court/cases/${r.id}`}>{r.id}</Link> },
    { key: "title", header: "Case Title" },
    { key: "courtSubmissionDate", header: "Submitted", render: (r) => formatDate(r.courtSubmissionDate) },
    { key: "evidenceIds", header: "Evidence", align: "center", render: (r) => r.evidenceIds.length },
    {
      key: "integrity", header: "Integrity",
      render: (r) => {
        const ev = getEvidenceByCase(r.id);
        const allVerified = ev.length > 0 && ev.every((e) => e.integrityStatus === "verified");
        return <IntegrityBadge status={allVerified ? "verified" : ev.some((e) => e.integrityStatus === "mismatch") ? "mismatch" : "pending"} />;
      },
    },
    { key: "status", header: "Review Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "action", header: "", align: "right", render: (r) => <Link className="btn btn-secondary btn-sm" to={`/court/cases/${r.id}`}>Review</Link> },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Judicial Review Queue</div>
          <h1 className="page-title">Welcome, {user.name}</h1>
          <p className="page-desc">Cases submitted by Investigation Officers awaiting your judicial review.</p>
        </div>
      </div>

      <div className="grid-kpis">
        <KpiCard icon={Scale} label="Submitted Cases" value={cases.length} tone="navy" />
        <KpiCard icon={Gavel} label="Cases Under Review" value={underReview.length} tone="amber" />
        <KpiCard icon={Shield} label="Evidence Items" value={evidenceCount} tone="blue" />
        <KpiCard icon={FileCheck2} label="Reports Reviewed" value={reportsReviewed} tone="green" />
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">Submitted Cases</div></div>
        <DataTable columns={columns} data={cases} emptyTitle="No cases submitted yet" emptyDesc="Cases submitted for judicial review will appear here." />
      </div>
    </div>
  );
}
