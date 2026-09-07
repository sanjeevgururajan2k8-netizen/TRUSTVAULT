import { CheckCircle2, Circle } from "lucide-react";

/** items: [{ label, done }] */
export default function ProgressChecklist({ items, showPercent = false }) {
  const doneCount = items.filter((i) => i.done).length;
  const pct = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  return (
    <div>
      {showPercent && (
        <div style={{ marginBottom: 14 }}>
          <div className="flex justify-between items-center" style={{ marginBottom: 6 }}>
            <span className="text-sm font-semibold">Case Completeness</span>
            <span className="text-sm font-bold" style={{ color: "var(--accent-blue)" }}>{pct}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
      <ul className="stack-y">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-8" style={{ fontSize: 13 }}>
            {item.done ? (
              <CheckCircle2 size={17} style={{ color: "var(--status-green)", flexShrink: 0 }} />
            ) : (
              <Circle size={17} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            )}
            <span style={{ color: item.done ? "var(--text-primary)" : "var(--text-muted)", fontWeight: item.done ? 500 : 400 }}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
