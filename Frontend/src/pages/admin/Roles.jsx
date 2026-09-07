import { Check, Minus } from "lucide-react";
import { PERMISSION_MATRIX } from "../../data/mockData";

function Cell({ value }) {
  if (value === "yes") return <Check size={16} className="perm-yes" />;
  if (value === "limited") return <span className="perm-limited">Limited</span>;
  return <Minus size={16} className="perm-no" />;
}

export default function AdminRoles() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">System Administration</div>
          <h1 className="page-title">Roles &amp; Permissions</h1>
          <p className="page-desc">Role-based access control across the four platform roles.</p>
        </div>
      </div>

      <div className="card">
        <div className="matrix-wrap">
          <table className="matrix">
            <thead>
              <tr>
                <th>Permission</th>
                <th>Investigation Officer</th>
                <th>Forensic Officer</th>
                <th>Court Justice</th>
                <th>Administrator</th>
              </tr>
            </thead>
            <tbody>
              {PERMISSION_MATRIX.map((row) => (
                <tr key={row.permission}>
                  <td>{row.permission}</td>
                  <td><Cell value={row.investigation} /></td>
                  <td><Cell value={row.forensic} /></td>
                  <td><Cell value={row.court} /></td>
                  <td><Cell value={row.admin} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card card-pad" style={{ marginTop: 20 }}>
        <div className="card-title" style={{ marginBottom: 10 }}>Role Descriptions</div>
        <div className="grid-2-eq">
          <div className="text-sm text-secondary"><b>Investigation Officer</b> — creates and manages cases, uploads evidence, submits to forensic, and prepares court submissions.</div>
          <div className="text-sm text-secondary"><b>Forensic Officer</b> — receives, verifies and examines evidence, then generates and submits forensic reports.</div>
          <div className="text-sm text-secondary"><b>Court Justice</b> — reviews submitted cases, evidence integrity, chain of custody and forensic findings.</div>
          <div className="text-sm text-secondary"><b>Administrator</b> — manages users, roles, permissions, and system-wide audit visibility.</div>
        </div>
      </div>
    </div>
  );
}
