import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getCasesForUser } from "../../data/api";
import { CASE_STATUS_OPTIONS, PRIORITY_OPTIONS } from "../../data/mockData";
import DataTable from "../../components/data/DataTable";
import StatusBadge, { PriorityBadge } from "../../components/ui/StatusBadge";
import SearchBar from "../../components/ui/SearchBar";
import Pagination from "../../components/ui/Pagination";
import usePagination from "../../utils/usePagination";
import { formatDate } from "../../utils/helpers";

export default function InvestigationCases() {
  const { user } = useAuth();
  const allCases = getCasesForUser(user);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  const filtered = useMemo(() => {
    return allCases.filter((c) => {
      const matchesQuery =
        !query ||
        c.id.toLowerCase().includes(query.toLowerCase()) ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.caseNumber.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All" || c.status === status;
      const matchesPriority = priority === "All" || c.priority === priority;
      return matchesQuery && matchesStatus && matchesPriority;
    });
  }, [allCases, query, status, priority]);

  const { page, setPage, pageCount, pageItems, total, pageSize } = usePagination(filtered, 6);

  const columns = [
    { key: "id", header: "Case ID", sortable: true, render: (r) => <span className="font-mono cell-mono font-semibold">{r.id}</span> },
    { key: "caseNumber", header: "Case Number", render: (r) => <span className="cell-mono">{r.caseNumber}</span> },
    { key: "title", header: "Case Title", render: (r) => <span className="truncate" style={{ maxWidth: 240, display: "inline-block" }}>{r.title}</span> },
    { key: "incidentDate", header: "Date", sortable: true, sortValue: (r) => r.incidentDate, render: (r) => formatDate(r.incidentDate) },
    { key: "priority", header: "Priority", sortable: true, render: (r) => <PriorityBadge priority={r.priority} /> },
    { key: "evidenceIds", header: "Evidence", align: "center", render: (r) => r.evidenceIds.length },
    { key: "status", header: "Status", sortable: true, render: (r) => <StatusBadge status={r.status} /> },
    { key: "lastUpdated", header: "Last Updated", sortable: true, sortValue: (r) => r.lastUpdated, render: (r) => formatDate(r.lastUpdated) },
    {
      key: "actions", header: "", align: "right",
      render: (r) => (
        <div className="row-actions" style={{ justifyContent: "flex-end" }}>
          <Link className="btn btn-secondary btn-sm" to={`/investigation/cases/${r.id}`}><Eye size={13} /> View</Link>
          <Link className="btn btn-ghost btn-sm" to={`/investigation/evidence/upload?case=${r.id}`}><Shield size={13} /> Add Evidence</Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Case Management</div>
          <h1 className="page-title">Investigation Cases</h1>
          <p className="page-desc">All investigations currently assigned to you.</p>
        </div>
        <div className="page-actions">
          <Link className="btn btn-primary" to="/investigation/cases/new"><Plus size={15} /> Create Case</Link>
        </div>
      </div>

      <div className="card">
        <div className="card-pad flex items-center gap-12 flex-wrap" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <SearchBar value={query} onChange={setQuery} placeholder="Search case ID, title or case number…" className="grow" />
          <select className="select" style={{ width: 190 }} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">All Statuses</option>
            {CASE_STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="select" style={{ width: 150 }} value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="All">All Priorities</option>
            {PRIORITY_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <DataTable
          columns={columns}
          data={pageItems}
          emptyTitle="No cases match your filters"
          emptyDesc="Try adjusting your search or filters, or create a new case."
        />
        <Pagination page={page} pageCount={pageCount} total={total} pageSize={pageSize} onPageChange={setPage} />
      </div>
    </div>
  );
}
