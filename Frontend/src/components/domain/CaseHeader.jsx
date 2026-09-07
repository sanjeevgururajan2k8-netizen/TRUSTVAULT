import StatusBadge from "../ui/StatusBadge";
import { PriorityBadge } from "../ui/StatusBadge";
import boardImg from "../../assets/investigation-board.jpg";

/**
 * Rich header used for Case Details / Evidence Details / Case Review workspaces.
 * meta: [{ label, value }]
 */
export default function CaseHeader({ eyebrow, title, subtitle, status, priority, meta = [], actions }) {
  return (
    <div className="detail-header" style={{ backgroundImage: `url(${boardImg})` }}>
      <div className="detail-header-inner">
        <div className="flex items-center justify-between flex-wrap gap-10">
          <div>
            {eyebrow && <div className="detail-eyebrow">{eyebrow}</div>}
            <div className="detail-title">{title}</div>
            {subtitle && <div className="detail-sub">{subtitle}</div>}
          </div>
          <div className="flex items-center gap-8">
            {priority && <PriorityBadge priority={priority} />}
            {status && <StatusBadge status={status} size="lg" />}
          </div>
        </div>

        {meta.length > 0 && (
          <div className="detail-meta-row">
            {meta.map((m, i) => (
              <div className="detail-meta-item" key={i}>
                {m.label}
                <b>{m.value}</b>
              </div>
            ))}
          </div>
        )}

        {actions && <div className="detail-actions">{actions}</div>}
      </div>
    </div>
  );
}
