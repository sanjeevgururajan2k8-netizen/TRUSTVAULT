import { Check, AlertTriangle, Clock } from "lucide-react";
import { formatDateTime } from "../../utils/helpers";

/**
 * events: [{ actor, role, action, timestamp, hash, status: 'ok' | 'warn' | 'pending' }]
 */
export default function VerticalTimeline({ events }) {
  if (!events?.length) return null;
  return (
    <div className="vtimeline">
      {events.map((ev, idx) => {
        const isLast = idx === events.length - 1;
        const dotClass = ev.status === "warn" ? "warn" : ev.status === "pending" ? "pending" : "done";
        const Icon = ev.status === "warn" ? AlertTriangle : ev.status === "pending" ? Clock : Check;
        return (
          <div className="vtimeline-item" key={idx}>
            <div className="vtimeline-rail">
              <div className={`vtimeline-dot ${dotClass}`}>
                <Icon size={12} />
              </div>
              {!isLast && <div className="vtimeline-line" />}
            </div>
            <div className="vtimeline-content">
              <div className="vtimeline-title">{ev.action}</div>
              <div className="vtimeline-meta">
                <span>{ev.actor}{ev.role ? ` · ${ev.role}` : ""}</span>
                <span>{formatDateTime(ev.timestamp)}</span>
              </div>
              {ev.hash && <div className="vtimeline-hash">Hash: {ev.hash}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
