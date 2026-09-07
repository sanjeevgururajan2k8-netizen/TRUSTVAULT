import { useMemo, useState } from "react";
import DataTable from "../data/DataTable";
import SearchBar from "../ui/SearchBar";
import StatusBadge from "../ui/StatusBadge";
import Pagination from "../ui/Pagination";
import usePagination from "../../utils/usePagination";
import { ROLE_LABELS } from "../../data/mockData";
import { formatDateTime } from "../../utils/helpers";

export default function AuditLogTable({ logs, showRoleFilter = true }) {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const roles = useMemo(() => Array.from(new Set(logs.map((l) => l.role))), [logs]);

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        l.actor.toLowerCase().includes(q) ||
        l.action.toLowerCase().includes(q) ||
        l.entity.toLowerCase().includes(q);
      const matchesRole = roleFilter === "All" || l.role === roleFilter;
      const matchesStatus = statusFilter === "All" || l.status === statusFilter;
      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [logs, query, roleFilter, statusFilter]);

  const sortedLogs = useMemo(
    () => [...filtered].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
    [filtered]
  );

  const { page, setPage, pageCount, pageItems, total, pageSize } = usePagination(sortedLogs, 8);

  const columns = [
    { key: "timestamp", header: "Timestamp", render: (r) => <span className="cell-mono text-xs">{formatDateTime(r.timestamp)}</span> },
    { key: "actor", header: "Actor" },
    { key: "role", header: "Role", render: (r) => <span className="text-xs text-muted">{ROLE_LABELS[r.role] || r.role}</span> },
    { key: "action", header: "Action" },
    { key: "entity", header: "Entity", render: (r) => <span className="cell-mono">{r.entity}</span> },
    { key: "ip", header: "IP / Session", render: (r) => <span className="cell-mono text-xs cell-muted">{r.ip}</span> },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div className="card">
      <div className="card-pad flex items-center gap-12 flex-wrap" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <SearchBar value={query} onChange={setQuery} placeholder="Search actor, action or entity…" className="grow" />
        {showRoleFilter && (
          <select className="select" style={{ width: 190 }} value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="All">All Roles</option>
            {roles.map((r) => <option key={r} value={r}>{ROLE_LABELS[r] || r}</option>)}
          </select>
        )}
        <select className="select" style={{ width: 150 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Success">Success</option>
          <option value="Warning">Warning</option>
          <option value="Failed">Failed</option>
        </select>
      </div>
      <DataTable columns={columns} data={pageItems} emptyTitle="No matching audit events" emptyDesc="Try a different filter combination." />
      <Pagination page={page} pageCount={pageCount} total={total} pageSize={pageSize} onPageChange={setPage} />
    </div>
  );
}
