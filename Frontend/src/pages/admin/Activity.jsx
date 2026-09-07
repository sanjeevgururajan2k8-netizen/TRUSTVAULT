import { SYSTEM_ACTIVITY } from "../../data/mockData";
import { getAuditLogsForRole } from "../../data/api";
import { ROLES } from "../../data/mockData";
import ActivityFeed from "../../components/domain/ActivityFeed";
import AuditLogTable from "../../components/domain/AuditLogTable";

export default function AdminActivity() {
  const logs = getAuditLogsForRole(ROLES.ADMIN);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">System Administration</div>
          <h1 className="page-title">System Activity</h1>
          <p className="page-desc">Monitor logins, evidence uploads, transfers, report submissions and case submissions in real time.</p>
        </div>
      </div>

      <div className="grid-2">
        <AuditLogTable logs={logs} />
        <div className="card card-pad">
          <div className="card-title" style={{ marginBottom: 6 }}>Highlights</div>
          <ActivityFeed items={SYSTEM_ACTIVITY} />
        </div>
      </div>
    </div>
  );
}
