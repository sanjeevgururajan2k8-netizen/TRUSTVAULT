import { Link } from "react-router-dom";
import { getForensicWorkQueue } from "../../data/api";
import DataTable from "../../components/data/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import { formatDate } from "../../utils/helpers";

export default function Examinations() {
  const items = getForensicWorkQueue().filter((e) => ["Received", "Under Examination", "Examination Completed"].includes(e.status));

  const columns = [
    { key: "id", header: "Evidence ID", render: (r) => <span className="font-mono font-semibold text-sm">{r.id}</span> },
    { key: "caseId", header: "Case" },
    { key: "type", header: "Type" },
    { key: "uploadDate", header: "Assigned", render: (r) => formatDate(r.uploadDate) },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "action", header: "", align: "right",
      render: (r) => (
        <Link className="btn btn-secondary btn-sm" to={`/forensic/evidence/${r.id}?tab=examination`}>
          {r.status === "Under Examination" ? "Continue" : r.status === "Received" ? "Start" : "View"}
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Laboratory Work</div>
          <h1 className="page-title">Examinations</h1>
          <p className="page-desc">Evidence accepted into custody and undergoing or awaiting forensic examination.</p>
        </div>
      </div>
      <div className="card">
        <DataTable
          columns={columns}
          data={items}
          emptyTitle="No active examinations"
          emptyDesc="Accept evidence from your queue to begin an examination."
        />
      </div>
    </div>
  );
}
