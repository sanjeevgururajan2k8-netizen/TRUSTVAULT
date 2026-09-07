import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getForensicWorkQueue } from "../../data/api";
import DataTable from "../../components/data/DataTable";
import StatusBadge, { IntegrityBadge } from "../../components/ui/StatusBadge";
import SearchBar from "../../components/ui/SearchBar";
import { formatDate } from "../../utils/helpers";

export default function ForensicEvidence() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const queue = getForensicWorkQueue();

  const filtered = useMemo(
    () =>
      queue.filter(
        (e) =>
          (status === "All" || e.status === status) &&
          (!query || e.id.toLowerCase().includes(query.toLowerCase()) || e.name.toLowerCase().includes(query.toLowerCase()) || e.caseId.toLowerCase().includes(query.toLowerCase()))
      ),
    [queue, query, status]
  );

  const statuses = Array.from(new Set(queue.map((e) => e.status)));

  const columns = [
    { key: "id", header: "Evidence ID", render: (r) => <span className="font-mono font-semibold text-sm">{r.id}</span> },
    { key: "caseId", header: "Case", render: (r) => <span className="font-mono text-sm">{r.caseId}</span> },
    { key: "name", header: "Evidence", render: (r) => <span className="truncate" style={{ maxWidth: 220, display: "inline-block" }}>{r.name}</span> },
    { key: "type", header: "Type" },
    { key: "uploadDate", header: "Received", render: (r) => formatDate(r.uploadDate) },
    { key: "integrityStatus", header: "Integrity", render: (r) => <IntegrityBadge status={r.integrityStatus} /> },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "action", header: "", align: "right", render: (r) => <Link className="btn btn-secondary btn-sm" to={`/forensic/evidence/${r.id}`}>Open</Link> },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Laboratory Queue</div>
          <h1 className="page-title">Assigned Evidence</h1>
          <p className="page-desc">Digital evidence submitted to the Digital Forensics Laboratory for examination.</p>
        </div>
      </div>

      <div className="card">
        <div className="card-pad flex items-center gap-12 flex-wrap" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <SearchBar value={query} onChange={setQuery} placeholder="Search evidence ID, name or case…" className="grow" />
          <select className="select" style={{ width: 200 }} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">All Statuses</option>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <DataTable columns={columns} data={filtered} emptyTitle="No evidence assigned" emptyDesc="Evidence submitted by investigation officers will appear here." />
      </div>
    </div>
  );
}
