import { Link } from "react-router-dom";
import { Users, Eye, Bot } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getCasesForUser, getWitnessesByCase } from "../../data/api";
import { useToast } from "../../context/ToastContext";
import EmptyState from "../../components/ui/EmptyState";
import StatusBadge from "../../components/ui/StatusBadge";
import { formatDate } from "../../utils/helpers";

export default function InvestigationWitnesses() {
  const { user } = useAuth();
  const toast = useToast();
  const cases = getCasesForUser(user);
  const witnesses = cases.flatMap((c) => getWitnessesByCase(c.id).map((w) => ({ ...w, caseTitle: c.title })));

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Investigation Records</div>
          <h1 className="page-title">Witness Statements</h1>
          <p className="page-desc">All recorded witness statements across your assigned cases.</p>
        </div>
      </div>

      {witnesses.length === 0 ? (
        <EmptyState icon={Users} title="No witness statements yet" description="Add witness statements from within a case to see them here." />
      ) : (
        <div className="grid-3">
          {witnesses.map((w) => (
            <div key={w.id} className="card card-pad">
              <div className="text-xs text-muted font-mono" style={{ marginBottom: 4 }}>{w.caseId}</div>
              <div className="font-semibold text-md">{w.name}</div>
              <div className="text-xs text-muted" style={{ marginBottom: 8 }}>{w.role}</div>
              <div className="flex items-center gap-8" style={{ marginBottom: 10 }}>
                <StatusBadge status={w.status} />
                <span className="text-xs text-muted">{formatDate(w.statementDate)}</span>
              </div>
              <div className="row-actions">
                <button className="btn btn-secondary btn-sm" onClick={() => toast.info(`Statement — ${w.name}`, w.statementText.slice(0, 80) + "…")}>
                  <Eye size={13} /> View Statement
                </button>
                <Link className="btn btn-ghost btn-sm" to={`/investigation/cases/${w.caseId}?tab=witnesses`}>
                  <Bot size={13} /> Case
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
