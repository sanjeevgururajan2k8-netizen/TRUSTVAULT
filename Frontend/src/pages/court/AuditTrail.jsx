import { useAuth } from "../../context/AuthContext";
import { getAuditLogsForRole } from "../../data/api";
import AuditLogTable from "../../components/domain/AuditLogTable";

export default function CourtAuditTrail() {
  const { role } = useAuth();
  const logs = getAuditLogsForRole(role);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Accountability</div>
          <h1 className="page-title">Audit Trail</h1>
          <p className="page-desc">Evidence upload, transfer, examination, and submission events for cases under judicial review.</p>
        </div>
      </div>
      <AuditLogTable logs={logs} />
    </div>
  );
}
