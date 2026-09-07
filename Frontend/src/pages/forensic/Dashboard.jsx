import { Link } from "react-router-dom";
import { Shield, Clock, Microscope, FileCheck2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getForensicWorkQueue } from "../../data/api";
import KpiCard from "../../components/domain/KpiCard";
import DataTable from "../../components/data/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import { IntegrityBadge } from "../../components/ui/StatusBadge";
import ActivityFeed from "../../components/domain/ActivityFeed";
import { formatDate } from "../../utils/helpers";

export default function ForensicDashboard() {
  const { user } = useAuth();
  const queue = getForensicWorkQueue();
  const pendingExam = queue.filter((e) => e.status === "Sent to Forensic" || e.status === "Received");
  const inExam = queue.filter((e) => e.status === "Under Examination");
  const reportsPending = queue.filter((e) => e.status === "Examination Completed");

  const columns = [
    { key: "id", header: "Evidence ID", render: (r) => <Link className="font-mono font-semibold text-sm" to={`/forensic/evidence/${r.id}`}>{r.id}</Link> },
    { key: "caseId", header: "Case", render: (r) => <span className="font-mono text-sm">{r.caseId}</span> },
    { key: "type", header: "Evidence Type" },
    { key: "uploadDate", header: "Received", render: (r) => formatDate(r.uploadDate) },
    { key: "integrityStatus", header: "Integrity", render: (r) => <IntegrityBadge status={r.integrityStatus} /> },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "action", header: "", align: "right", render: (r) => <Link className="btn btn-secondary btn-sm" to={`/forensic/evidence/${r.id}`}>Open</Link> },
  ];

  const recentActivity = [
    { icon: "transfer", title: "Evidence assigned", desc: "EV-1051 submitted for examination", time: "1 day ago" },
    { icon: "report", title: "Report submitted", desc: "FR-2026-0098 delivered to Investigation Officer", time: "1 day ago" },
    { icon: "warning", title: "Integrity mismatch flagged", desc: "EV-1080 hash mismatch identified", time: "3 days ago" },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Forensic Laboratory Overview</div>
          <h1 className="page-title">Welcome, {user.name.split(" ")[0]}</h1>
          <p className="page-desc">Evidence assigned to the Digital Forensics Laboratory for examination.</p>
        </div>
      </div>

      <div className="grid-kpis">
        <KpiCard icon={Shield} label="Assigned Evidence" value={queue.length} tone="blue" />
        <KpiCard icon={Clock} label="Pending Examination" value={pendingExam.length} trendDir="down" trend="Awaiting acceptance" tone="amber" />
        <KpiCard icon={Microscope} label="In Examination" value={inExam.length} tone="navy" />
        <KpiCard icon={FileCheck2} label="Reports Pending" value={reportsPending.length} tone="green" />
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Assigned Evidence Queue</div>
            <Link className="btn btn-ghost btn-sm" to="/forensic/evidence">View All</Link>
          </div>
          <DataTable columns={columns} data={queue} emptyTitle="No evidence assigned" emptyDesc="Evidence submitted to this lab will appear here." />
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Recent Activity</div></div>
          <div className="card-pad" style={{ paddingTop: 4, paddingBottom: 4 }}>
            <ActivityFeed items={recentActivity} />
          </div>
        </div>
      </div>
    </div>
  );
}
