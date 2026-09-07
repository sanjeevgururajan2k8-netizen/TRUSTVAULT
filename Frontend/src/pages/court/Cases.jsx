import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getSubmittedCourtCases, getEvidenceByCase } from "../../data/api";
import DataTable from "../../components/data/DataTable";
import StatusBadge, { IntegrityBadge, PriorityBadge } from "../../components/ui/StatusBadge";
import SearchBar from "../../components/ui/SearchBar";
import { formatDate } from "../../utils/helpers";

export default function CourtCases() {
  const [query, setQuery] = useState("");
  const cases = getSubmittedCourtCases();

  const filtered = useMemo(
    () => cases.filter((c) => !query || c.id.toLowerCase().includes(query.toLowerCase()) || c.title.toLowerCase().includes(query.toLowerCase())),
    [cases, query]
  );

  const columns = [
    { key: "id", header: "Case ID", render: (r) => <span className="font-mono font-semibold text-sm">{r.id}</span> },
    { key: "title", header: "Case Title" },
    { key: "priority", header: "Priority", render: (r) => <PriorityBadge priority={r.priority} /> },
    { key: "courtSubmissionDate", header: "Submitted Date", render: (r) => formatDate(r.courtSubmissionDate) },
    { key: "evidenceIds", header: "Evidence", align: "center", render: (r) => r.evidenceIds.length },
    {
      key: "integrity", header: "Integrity",
      render: (r) => {
        const ev = getEvidenceByCase(r.id);
        const allVerified = ev.length > 0 && ev.every((e) => e.integrityStatus === "verified");
        return <IntegrityBadge status={allVerified ? "verified" : ev.some((e) => e.integrityStatus === "mismatch") ? "mismatch" : "pending"} />;
      },
    },
    { key: "status", header: "Review Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "action", header: "", align: "right", render: (r) => <Link className="btn btn-secondary btn-sm" to={`/court/cases/${r.id}`}>Review Case</Link> },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Judicial Review</div>
          <h1 className="page-title">Submitted Cases</h1>
          <p className="page-desc">All investigation cases formally submitted for your review.</p>
        </div>
      </div>
      <div className="card">
        <div className="card-pad" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <SearchBar value={query} onChange={setQuery} placeholder="Search case ID or title…" />
        </div>
        <DataTable columns={columns} data={filtered} emptyTitle="No submitted cases" emptyDesc="Cases submitted by investigation officers will appear here." />
      </div>
    </div>
  );
}
