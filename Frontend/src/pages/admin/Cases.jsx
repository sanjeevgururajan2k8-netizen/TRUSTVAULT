import { CASES, USERS } from "../../data/mockData";
import DataTable from "../../components/data/DataTable";
import StatusBadge, { PriorityBadge } from "../../components/ui/StatusBadge";
import { formatDate } from "../../utils/helpers";

export default function AdminCases() {
  const columns = [
    { key: "id", header: "Case ID", render: (r) => <span className="font-mono font-semibold text-sm">{r.id}</span> },
    { key: "title", header: "Case Title" },
    {
      key: "investigatorId", header: "Investigation Officer",
      render: (r) => USERS.find((u) => u.id === r.investigatorId)?.name || "—",
    },
    { key: "priority", header: "Priority", render: (r) => <PriorityBadge priority={r.priority} /> },
    { key: "evidenceIds", header: "Evidence", align: "center", render: (r) => r.evidenceIds.length },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "lastUpdated", header: "Last Updated", render: (r) => formatDate(r.lastUpdated) },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">System Oversight</div>
          <h1 className="page-title">All Cases</h1>
          <p className="page-desc">Read-only administrative view of every investigation case in the system.</p>
        </div>
      </div>
      <div className="card">
        <DataTable columns={columns} data={CASES} emptyTitle="No cases in the system" />
      </div>
    </div>
  );
}
