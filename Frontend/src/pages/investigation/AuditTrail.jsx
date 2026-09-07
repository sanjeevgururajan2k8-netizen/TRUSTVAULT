import { useAuth } from "../../context/AuthContext";
import { getAuditLogsForRole } from "../../data/api";
import AuditLogTable from "../../components/domain/AuditLogTable";

export default function InvestigationAuditTrail() {
  const { role } = useAuth();
  const logs = getAuditLogsForRole(role);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Accountability</div>
          <h1 className="page-title">Audit Trail</h1>
          <p className="page-desc">A record of every action you've taken across your assigned cases and evidence.</p>
        </div>
      </div>
      <AuditLogTable logs={logs} showRoleFilter={false} />
    </div>
  );
}
