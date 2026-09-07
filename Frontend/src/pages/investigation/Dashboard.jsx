import { Link } from "react-router-dom";
import { Folder, Shield, Microscope, Scale, Bot, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getCasesForUser, getEvidenceByCase, getAllForensicReports } from "../../data/api";
import KpiCard from "../../components/domain/KpiCard";
import DataTable from "../../components/data/DataTable";
import StatusBadge, { PriorityBadge } from "../../components/ui/StatusBadge";
import ActivityFeed from "../../components/domain/ActivityFeed";
import FlowSteps from "../../components/domain/FlowSteps";
import { formatDate, timeAgo } from "../../utils/helpers";

export default function InvestigationDashboard() {
  const { user } = useAuth();
  const cases = getCasesForUser(user);
  const activeCases = cases.filter((c) => c.status !== "Submitted to Court");
  const allEvidence = cases.flatMap((c) => getEvidenceByCase(c.id));
  const pendingEvidence = allEvidence.filter((e) => e.status !== "Report Submitted");
  const reports = getAllForensicReports().filter((r) => cases.some((c) => c.id === r.caseId));
  const courtSubmissions = cases.filter((c) => c.submittedToCourt || c.status === "Ready for Court").length;

  const recentEvidence = [...allEvidence]
    .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
    .slice(0, 4);

  const primaryCase = cases.find((c) => c.id === "CASE-2026-00421") || cases[0];

  const columns = [
    { key: "id", header: "Case ID", render: (r) => <Link to={`/investigation/cases/${r.id}`} className="font-mono text-sm font-semibold">{r.id}</Link> },
    { key: "title", header: "Case", render: (r) => <span className="truncate" style={{ maxWidth: 220, display: "inline-block" }}>{r.title}</span> },
    { key: "priority", header: "Priority", render: (r) => <PriorityBadge priority={r.priority} /> },
    { key: "evidence", header: "Evidence", align: "center", render: (r) => r.evidenceIds.length },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "action", header: "", align: "right",
      render: (r) => <Link className="btn btn-secondary btn-sm" to={`/investigation/cases/${r.id}`}>View</Link>,
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Investigation Overview</div>
          <h1 className="page-title">Good Morning, Officer {user.name.split(" ")[0]}</h1>
          <p className="page-desc">Here's what's happening across your assigned cases today.</p>
        </div>
        <div className="page-actions">
          <Link className="btn btn-primary" to="/investigation/cases/new">Create New Case</Link>
        </div>
      </div>

      <div className="grid-kpis">
        <KpiCard icon={Folder} label="Active Cases" value={activeCases.length} trend="↑ 8% this month" tone="blue" />
        <KpiCard icon={Shield} label="Pending Evidence" value={pendingEvidence.length} trend="Needs attention" trendDir="down" tone="amber" />
        <KpiCard icon={Microscope} label="Forensic Reports" value={reports.length} trend="Up to date" tone="green" />
        <KpiCard icon={Scale} label="Court Submissions" value={courtSubmissions} trend="1 ready" tone="navy" />
      </div>

      <div className="grid-2">
        <div className="flex-col gap-20">
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Active Cases</div>
                <div className="card-subtitle">Cases currently assigned to you</div>
              </div>
              <Link to="/investigation/cases" className="btn btn-ghost btn-sm">View All <ArrowRight size={14} /></Link>
            </div>
            <DataTable columns={columns} data={activeCases} emptyTitle="No active cases" emptyDesc="Cases you create will appear here." />
          </div>

          <Link to="/investigation/ai-assistant" className="card card-hover card-pad" style={{ background: "linear-gradient(135deg, var(--navy-900), var(--navy-700))", color: "#fff", textDecoration: "none", border: "none" }}>
            <div className="flex items-center gap-16 flex-wrap">
              <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Bot size={22} color="#fff" />
              </div>
              <div className="grow">
                <div className="font-bold text-lg" style={{ color: "#fff" }}>🤖 AI Investigation Assistant</div>
                <div className="text-sm" style={{ color: "#cfdaf2" }}>Need help understanding a case? Ask the AI for a summary, timeline, or key points.</div>
              </div>
              <span className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>Ask AI About a Case <ArrowRight size={14} /></span>
            </div>
          </Link>
        </div>

        <div className="flex-col gap-20">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Recent Evidence Activity</div>
            </div>
            <div className="card-pad" style={{ paddingTop: 6, paddingBottom: 6 }}>
              {recentEvidence.map((e) => (
                <div key={e.id} className="activity-item">
                  <div className="activity-icon" style={{ background: "var(--status-blue-bg)", color: "var(--status-blue)" }}>
                    <Shield size={15} />
                  </div>
                  <div className="grow">
                    <div className="activity-title">Evidence #{e.id} · {e.type}</div>
                    <div className="activity-desc flex items-center gap-6" style={{ flexWrap: "wrap" }}>
                      {e.integrityStatus === "verified" && (
                        <span className="badge badge-green" style={{ padding: "1px 8px" }}><ShieldCheck size={10} /> Hash Verified</span>
                      )}
                      <StatusBadge status={e.status} />
                    </div>
                    <div className="activity-time">{timeAgo(e.uploadDate)} · {formatDate(e.uploadDate)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {primaryCase && (
            <div className="card card-pad">
              <div className="card-title" style={{ marginBottom: 14 }}>Investigation Timeline</div>
              <FlowSteps
                steps={[
                  { label: "Case Created", done: primaryCase.progress.caseCreated },
                  { label: "Evidence Uploaded", done: primaryCase.progress.evidenceCollected },
                  { label: "Evidence Sent to Forensic", done: primaryCase.progress.forensicExamination },
                  { label: "Forensic Report Received", done: primaryCase.progress.forensicReport },
                  { label: "Court Submission", done: primaryCase.progress.courtSubmission },
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
