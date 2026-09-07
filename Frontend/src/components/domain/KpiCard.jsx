import { ArrowUp, ArrowDown } from "lucide-react";

export default function KpiCard({ icon: Icon, label, value, trend, trendDir = "up", tone = "blue" }) {
  const toneBg = {
    blue: "var(--status-blue-bg)",
    green: "var(--status-green-bg)",
    amber: "var(--status-amber-bg)",
    red: "var(--status-red-bg)",
    navy: "var(--surface-sunken)",
  };
  const toneColor = {
    blue: "var(--status-blue)",
    green: "var(--status-green)",
    amber: "var(--status-amber)",
    red: "var(--status-red)",
    navy: "var(--navy-700)",
  };

  return (
    <div className="kpi-card card-hover">
      <div className="kpi-top">
        <div>
          <div className="kpi-value">{value}</div>
          <div className="kpi-label">{label}</div>
        </div>
        {Icon && (
          <div className="kpi-icon" style={{ background: toneBg[tone], color: toneColor[tone] }}>
            <Icon size={19} />
          </div>
        )}
      </div>
      {trend && (
        <span className={`kpi-trend ${trendDir}`}>
          {trendDir === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {trend}
        </span>
      )}
    </div>
  );
}
