import { Link } from "react-router-dom";
import { Users, UserCheck, Folder, Shield, Activity } from "lucide-react";
import { USERS, CASES, SYSTEM_ACTIVITY, ROLES } from "../../data/mockData";
import { getAllEvidence, getAuditLogsForRole } from "../../data/api";
import KpiCard from "../../components/domain/KpiCard";
import ActivityFeed from "../../components/domain/ActivityFeed";
import DataTable from "../../components/data/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import { formatDateTime } from "../../utils/helpers";

export default function AdminDashboard() {
  const activeUsers = USERS.filter((u) => u.status === "Active");
  const evidence = getAllEvidence();
  const recentEvents = getAuditLogsForRole(ROLES.ADMIN).slice(0, 6);

  const columns = [
    { key: "timestamp", header: "Timestamp", render: (r) => <span className="cell-mono text-xs">{formatDateTime(r.timestamp)}</span> },
    { key: "actor", header: "Actor" },
    { key: "action", header: "Action" },
    { key: "entity", header: "Entity", render: (r) => <span className="cell-mono">{r.entity}</span> },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">System Administration</div>
          <h1 className="page-title">Platform Overview</h1>
          <p className="page-desc">Users, cases and system-wide activity across TrustVault.</p>
        </div>
        <div className="page-actions">
          <Link className="btn btn-primary" to="/admin/users">Manage Users</Link>
        </div>
      </div>

      <div className="grid-kpis">
        <KpiCard icon={Users} label="Total Users" value={USERS.length} tone="blue" />
        <KpiCard icon={UserCheck} label="Active Users" value={activeUsers.length} tone="green" />
        <KpiCard icon={Folder} label="Total Cases" value={CASES.length} tone="navy" />
        <KpiCard icon={Shield} label="Evidence Records" value={evidence.length} tone="amber" />
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Recent System Events</div></div>
          <DataTable columns={columns} data={recentEvents} emptyTitle="No recent events" />
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title flex items-center gap-6"><Activity size={15} /> System Activity</div></div>
          <div className="card-pad" style={{ paddingTop: 4, paddingBottom: 4 }}>
            <ActivityFeed items={SYSTEM_ACTIVITY} />
          </div>
        </div>
      </div>
    </div>
  );
}
