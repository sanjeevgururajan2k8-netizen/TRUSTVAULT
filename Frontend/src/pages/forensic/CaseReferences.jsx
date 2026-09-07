import { Link } from "react-router-dom";
import { Folder } from "lucide-react";
import { getForensicWorkQueue, getCaseById } from "../../data/api";
import DataTable from "../../components/data/DataTable";
import StatusBadge, { PriorityBadge } from "../../components/ui/StatusBadge";

export default function CaseReferences() {
  const evidence = getForensicWorkQueue();
  const caseIds = Array.from(new Set(evidence.map((e) => e.caseId)));
  const cases = caseIds.map((id) => getCaseById(id)).filter(Boolean);

  const columns = [
    { key: "id", header: "Case ID", render: (r) => <span className="font-mono font-semibold text-sm">{r.id}</span> },
    { key: "title", header: "Case Title" },
    { key: "priority", header: "Priority", render: (r) => <PriorityBadge priority={r.priority} /> },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "evidenceCount", header: "Evidence Assigned", align: "center",
      render: (r) => evidence.filter((e) => e.caseId === r.id).length,
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Read-Only Reference</div>
          <h1 className="page-title">Case References</h1>
          <p className="page-desc">Investigation cases linked to evidence assigned to the laboratory. Case editing remains with the Investigation Officer.</p>
        </div>
      </div>
      <div className="card">
        <DataTable columns={columns} data={cases} emptyTitle="No linked cases" emptyIcon={Folder} />
      </div>
    </div>
  );
}
