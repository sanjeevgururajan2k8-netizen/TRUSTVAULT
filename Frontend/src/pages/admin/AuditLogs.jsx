import { useAuth } from "../../context/AuthContext";
import { getAuditLogsForRole } from "../../data/api";
import AuditLogTable from "../../components/domain/AuditLogTable";

export default function AdminAuditLogs() {
  const { role } = useAuth();
  const logs = getAuditLogsForRole(role);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">System Administration</div>
          <h1 className="page-title">Audit Logs</h1>
          <p className="page-desc">System-wide audit records for security monitoring and accountability.</p>
        </div>
      </div>
      <AuditLogTable logs={logs} />
    </div>
  );
}
