import { Link } from "react-router-dom";
import { Plus, Eye } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getAllForensicReports } from "../../data/api";
import DataTable from "../../components/data/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import { formatDateTime } from "../../utils/helpers";

export default function ForensicReports() {
  const { user } = useAuth();
  const reports = getAllForensicReports().filter((r) => r.examinerId === user.id);

  const columns = [
    { key: "id", header: "Report ID", render: (r) => <span className="font-mono font-semibold text-sm">{r.id}</span> },
    { key: "caseId", header: "Case", render: (r) => <span className="font-mono text-sm">{r.caseId}</span> },
    { key: "evidenceIds", header: "Evidence", render: (r) => r.evidenceIds.join(", ") },
    { key: "date", header: "Submitted", render: (r) => formatDateTime(r.date) },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "action", header: "", align: "right",
      render: (r) => <Link className="btn btn-secondary btn-sm" to={`/forensic/reports/${r.id}`}><Eye size={13} /> View</Link>,
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Laboratory Output</div>
          <h1 className="page-title">Forensic Reports</h1>
          <p className="page-desc">Reports you have generated and submitted back to investigation officers.</p>
        </div>
        <div className="page-actions">
          <Link className="btn btn-primary" to="/forensic/reports/new"><Plus size={15} /> New Report</Link>
        </div>
      </div>
      <div className="card">
        <DataTable columns={columns} data={reports} emptyTitle="No reports submitted yet" emptyDesc="Reports you submit will appear here." />
      </div>
    </div>
  );
}
