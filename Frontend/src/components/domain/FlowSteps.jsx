import { ArrowDown } from "lucide-react";
import { Check } from "lucide-react";

/** steps: [{ label, done }] rendered as a vertical arrow-connected flow. */
export default function FlowSteps({ steps }) {
  return (
    <div className="flowline">
      {steps.map((s, i) => (
        <div key={i}>
          <div className="flow-step">
            <div className={`flow-step-marker ${s.done ? "" : "pending"}`}>
              {s.done ? <Check size={14} /> : <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />}
            </div>
            <div className="flow-step-label">{s.label}</div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex" style={{ paddingLeft: 14 }}>
              <div className="flow-connector" />
              <ArrowDown size={12} style={{ color: "var(--text-muted)", marginLeft: -8, marginTop: 4 }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
