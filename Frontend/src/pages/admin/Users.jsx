import { useMemo, useState } from "react";
import { UserPlus, KeyRound, UserX, UserCheck, History, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { USERS, ROLES, ROLE_LABELS } from "../../data/mockData";
import { createUser, setUserStatus, getAuditLogsForRole } from "../../data/api";
import DataTable from "../../components/data/DataTable";
import SearchBar from "../../components/ui/SearchBar";
import StatusBadge from "../../components/ui/StatusBadge";
import UserAvatar from "../../components/ui/UserAvatar";
import Modal from "../../components/ui/Modal";
import { formatDateTime } from "../../utils/helpers";

const EMPTY_FORM = { name: "", employeeId: "", email: "", role: ROLES.INVESTIGATOR, department: "" };

export default function AdminUsers() {
  const { user: actingUser } = useAuth();
  const toast = useToast();
  const [tick, setTick] = useState(0);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [activityUser, setActivityUser] = useState(null);
  const [deactivateTarget, setDeactivateTarget] = useState(null);

  const filtered = useMemo(() => {
    return USERS.filter((u) => {
      const matchesQuery = !query || u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()) || u.employeeId.toLowerCase().includes(query.toLowerCase());
      const matchesRole = roleFilter === "All" || u.role === roleFilter;
      return matchesQuery && matchesRole;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, roleFilter, tick]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submitNewUser = (e) => {
    e.preventDefault();
    setSaving(true);
    window.setTimeout(() => {
      createUser(form, actingUser);
      setSaving(false);
      setAddOpen(false);
      setForm(EMPTY_FORM);
      toast.success("User created successfully");
      setTick((t) => t + 1);
    }, 700);
  };

  const toggleStatus = (u) => {
    if (u.status === "Active") {
      setDeactivateTarget(u);
    } else {
      setUserStatus(u.id, "Active", actingUser);
      toast.success(`${u.name} reactivated`);
      setTick((t) => t + 1);
    }
  };

  const confirmDeactivate = () => {
    setUserStatus(deactivateTarget.id, "Deactivated", actingUser);
    toast.warning(`${deactivateTarget.name} has been deactivated`);
    setDeactivateTarget(null);
    setTick((t) => t + 1);
  };

  const columns = [
    {
      key: "name", header: "User",
      render: (u) => (
        <div className="flex items-center gap-10">
          <UserAvatar name={u.name} size="sm" />
          <div>
            <div className="font-semibold text-sm">{u.name}</div>
            <div className="text-xs text-muted">{u.email}</div>
          </div>
        </div>
      ),
    },
    { key: "employeeId", header: "Employee ID", render: (u) => <span className="font-mono text-sm">{u.employeeId}</span> },
    { key: "role", header: "Role", render: (u) => <span className="text-sm">{ROLE_LABELS[u.role]}</span> },
    { key: "department", header: "Department" },
    { key: "status", header: "Status", render: (u) => <StatusBadge status={u.status} /> },
    { key: "lastLogin", header: "Last Login", render: (u) => (u.lastLogin ? formatDateTime(u.lastLogin) : "Never") },
    {
      key: "actions", header: "", align: "right",
      render: (u) => (
        <div className="row-actions" style={{ justifyContent: "flex-end" }}>
          <button className="btn btn-ghost btn-sm" onClick={() => toast.info("Edit user", `Editing ${u.name} would open a form here.`)}>Edit</button>
          <button className="btn btn-ghost btn-sm" onClick={() => toast.success("Password reset email sent", u.email)}><KeyRound size={13} /> Reset</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setActivityUser(u)}><History size={13} /> Activity</button>
          <button className={`btn btn-sm ${u.status === "Active" ? "btn-danger" : "btn-secondary"}`} onClick={() => toggleStatus(u)}>
            {u.status === "Active" ? <UserX size={13} /> : <UserCheck size={13} />}
            {u.status === "Active" ? "Deactivate" : "Activate"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">System Administration</div>
          <h1 className="page-title">User Management</h1>
          <p className="page-desc">Create accounts, assign roles, and control access across the platform.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={() => setAddOpen(true)}><UserPlus size={15} /> Add User</button>
        </div>
      </div>

      <div className="card">
        <div className="card-pad flex items-center gap-12 flex-wrap" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <SearchBar value={query} onChange={setQuery} placeholder="Search name, email or employee ID…" className="grow" />
          <select className="select" style={{ width: 220 }} value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="All">All Roles</option>
            {Object.values(ROLES).map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
          </select>
        </div>
        <DataTable columns={columns} data={filtered} emptyTitle="No users found" />
      </div>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add User"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setAddOpen(false)}>Cancel</button>
            <button className="btn btn-primary" form="add-user-form" type="submit" disabled={saving}>
              {saving ? <Loader2 size={14} className="spin" /> : <UserPlus size={14} />}
              {saving ? "Creating…" : "Create User"}
            </button>
          </>
        }
      >
        <form id="add-user-form" onSubmit={submitNewUser} className="stack-y">
          <div className="field">
            <label className="field-label">Full Name<span className="req">*</span></label>
            <input className="input" required value={form.name} onChange={set("name")} />
          </div>
          <div className="form-grid">
            <div className="field">
              <label className="field-label">Employee ID<span className="req">*</span></label>
              <input className="input" required value={form.employeeId} onChange={set("employeeId")} />
            </div>
            <div className="field">
              <label className="field-label">Role<span className="req">*</span></label>
              <select className="select" value={form.role} onChange={set("role")}>
                {Object.values(ROLES).map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
              </select>
            </div>
          </div>
          <div className="field">
            <label className="field-label">Official Email<span className="req">*</span></label>
            <input className="input" type="email" required value={form.email} onChange={set("email")} />
          </div>
          <div className="field">
            <label className="field-label">Department<span className="req">*</span></label>
            <input className="input" required value={form.department} onChange={set("department")} />
          </div>
        </form>
      </Modal>

      <Modal
        open={!!deactivateTarget}
        onClose={() => setDeactivateTarget(null)}
        title="Deactivate User"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setDeactivateTarget(null)}>Cancel</button>
            <button className="btn btn-danger" onClick={confirmDeactivate}><UserX size={14} /> Deactivate</button>
          </>
        }
      >
        <p className="text-sm text-secondary">
          {deactivateTarget?.name} will immediately lose access to TrustVault. This can be reversed later by reactivating the account.
        </p>
      </Modal>

      <Modal open={!!activityUser} onClose={() => setActivityUser(null)} title={`Activity — ${activityUser?.name || ""}`} wide>
        {activityUser && <AuditLogTableForUser userName={activityUser.name} />}
      </Modal>
    </div>
  );
}

function AuditLogTableForUser({ userName }) {
  const logs = getAuditLogsForRole(ROLES.ADMIN).filter((l) => l.actor === userName);
  if (logs.length === 0) return <p className="text-sm text-muted">No recorded activity for this user yet.</p>;
  return (
    <ul className="stack-y">
      {logs.map((l) => (
        <li key={l.id} className="text-sm flex justify-between" style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: 8 }}>
          <span>{l.action} — <span className="font-mono text-xs text-muted">{l.entity}</span></span>
          <span className="text-xs text-muted">{formatDateTime(l.timestamp)}</span>
        </li>
      ))}
    </ul>
  );
}
