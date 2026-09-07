import { CheckCircle2, Clock, AlertTriangle, Loader2, Archive, XCircle } from "lucide-react";
import { statusTone } from "../../utils/helpers";

const TONE_ICON = {
  green: CheckCircle2,
  amber: Clock,
  red: AlertTriangle,
  blue: Loader2,
  gray: Archive,
};

export default function StatusBadge({ status, tone, size, showIcon = true }) {
  const t = tone || statusTone(status);
  const Icon = TONE_ICON[t] || Archive;
  return (
    <span className={`badge badge-${t} ${size === "lg" ? "badge-lg" : ""}`}>
      {showIcon && <Icon size={size === "lg" ? 14 : 12} />}
      {status}
    </span>
  );
}

const PRIORITY_DOT = {
  High: "var(--status-red)",
  Medium: "var(--status-amber)",
  Low: "var(--status-green)",
};

export function PriorityBadge({ priority }) {
  return (
    <span className="priority-pill">
      <span className="priority-dot" style={{ background: PRIORITY_DOT[priority] || "var(--status-gray)" }} />
      {priority}
    </span>
  );
}

export function IntegrityBadge({ status }) {
  if (status === "verified") {
    return (
      <span className="badge badge-green">
        <CheckCircle2 size={12} /> Integrity Verified
      </span>
    );
  }
  if (status === "mismatch") {
    return (
      <span className="badge badge-red">
        <XCircle size={12} /> Integrity Mismatch
      </span>
    );
  }
  return (
    <span className="badge badge-gray">
      <Clock size={12} /> Not Yet Verified
    </span>
  );
}
