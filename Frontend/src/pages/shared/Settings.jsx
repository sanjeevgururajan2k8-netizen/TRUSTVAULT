import { useState } from "react";
import { Sun, Moon, ShieldCheck, Bell, Lock, User, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";
import { ROLE_LABELS } from "../../data/mockData";
import UserAvatar from "../../components/ui/UserAvatar";
import { formatDateTime } from "../../utils/helpers";

export default function Settings() {
  const { user, role } = useAuth();
  const { theme, setTheme } = useTheme();
  const toast = useToast();
  const [notifPrefs, setNotifPrefs] = useState({ email: true, inApp: true, integrity: true });
  const [savingPwd, setSavingPwd] = useState(false);

  const savePassword = (e) => {
    e.preventDefault();
    setSavingPwd(true);
    window.setTimeout(() => {
      setSavingPwd(false);
      toast.success("Password updated successfully");
      e.target.reset();
    }, 800);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Account</div>
          <h1 className="page-title">Settings</h1>
          <p className="page-desc">Manage your profile, security preferences and notification settings.</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="flex-col gap-20">
          <div className="card card-pad">
            <div className="card-title" style={{ marginBottom: 16 }}><User size={15} style={{ verticalAlign: -2, marginRight: 6 }} />Profile</div>
            <div className="flex items-center gap-14">
              <UserAvatar name={user.name} size="lg" />
              <div>
                <div className="font-bold text-lg">{user.name}</div>
                <div className="text-sm text-muted">{ROLE_LABELS[role]} · {user.department}</div>
                <div className="text-xs text-muted" style={{ marginTop: 2 }}>{user.email}</div>
              </div>
            </div>
            <hr className="divider" />
            <dl className="evidence-meta-grid" style={{ gridTemplateColumns: "1fr 1fr", fontSize: 12.5 }}>
              <dt>Employee ID</dt><dd>{user.employeeId}</dd>
              <dt>Status</dt><dd>{user.status}</dd>
              <dt>Last Login</dt><dd>{formatDateTime(user.lastLogin)}</dd>
              <dt>Department</dt><dd>{user.department}</dd>
            </dl>
          </div>

          <div className="card card-pad">
            <div className="card-title" style={{ marginBottom: 16 }}><Lock size={15} style={{ verticalAlign: -2, marginRight: 6 }} />Change Password</div>
            <form onSubmit={savePassword} className="stack-y">
              <div className="field">
                <label className="field-label">Current Password</label>
                <input className="input" type="password" required />
              </div>
              <div className="form-grid">
                <div className="field">
                  <label className="field-label">New Password</label>
                  <input className="input" type="password" required minLength={8} />
                </div>
                <div className="field">
                  <label className="field-label">Confirm New Password</label>
                  <input className="input" type="password" required minLength={8} />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="btn btn-primary" type="submit" disabled={savingPwd}>
                  {savingPwd ? <Loader2 size={14} className="spin" /> : <Lock size={14} />}
                  {savingPwd ? "Updating…" : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex-col gap-20">
          <div className="card card-pad">
            <div className="card-title" style={{ marginBottom: 14 }}>Appearance</div>
            <div className="chip-row">
              <button className={`chip ${theme === "light" ? "active" : ""}`} onClick={() => setTheme("light")}>
                <Sun size={13} style={{ verticalAlign: -2, marginRight: 5 }} /> Light
              </button>
              <button className={`chip ${theme === "dark" ? "active" : ""}`} onClick={() => setTheme("dark")}>
                <Moon size={13} style={{ verticalAlign: -2, marginRight: 5 }} /> Dark
              </button>
            </div>
            <p className="text-xs text-muted" style={{ marginTop: 10 }}>Your preference is saved to this browser and applied on every visit.</p>
          </div>

          <div className="card card-pad">
            <div className="card-title" style={{ marginBottom: 14 }}><Bell size={15} style={{ verticalAlign: -2, marginRight: 6 }} />Notifications</div>
            <div className="stack-y">
              {[
                { key: "email", label: "Email notifications for case updates" },
                { key: "inApp", label: "In-app notification bell" },
                { key: "integrity", label: "Immediate alert on evidence integrity mismatch" },
              ].map((opt) => (
                <label key={opt.key} className="checkbox-row" style={{ justifyContent: "space-between" }}>
                  <span>{opt.label}</span>
                  <input
                    type="checkbox"
                    checked={notifPrefs[opt.key]}
                    onChange={(e) => setNotifPrefs((p) => ({ ...p, [opt.key]: e.target.checked }))}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-title" style={{ marginBottom: 10 }}><ShieldCheck size={15} style={{ verticalAlign: -2, marginRight: 6, color: "var(--status-green)" }} />Session Security</div>
            <div className="security-strip">
              <span className="security-chip"><ShieldCheck /> Secure Session Active</span>
              <span className="security-chip"><ShieldCheck /> Role Protected Access</span>
              <span className="security-chip"><ShieldCheck /> JWT Authenticated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
