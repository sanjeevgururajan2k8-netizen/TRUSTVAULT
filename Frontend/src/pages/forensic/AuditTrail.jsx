import { useAuth } from "../../context/AuthContext";
import { getAuditLogsForRole } from "../../data/api";
import AuditLogTable from "../../components/domain/AuditLogTable";

export default function ForensicAuditTrail() {
  const { role } = useAuth();
  const logs = getAuditLogsForRole(role);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Accountability</div>
          <h1 className="page-title">Audit Trail</h1>
          <p className="page-desc">A record of your evidence handling and examination activity.</p>
        </div>
      </div>
      <AuditLogTable logs={logs} showRoleFilter={false} />
    </div>
  );
}
