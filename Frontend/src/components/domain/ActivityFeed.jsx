import {
  Upload, ArrowRightLeft, FileCheck2, Scale, UserPlus, ShieldAlert, Bot, User, LogIn,
} from "lucide-react";

const ICON_MAP = {
  upload: Upload,
  transfer: ArrowRightLeft,
  report: FileCheck2,
  court: Scale,
  user: UserPlus,
  warning: ShieldAlert,
  ai: Bot,
  login: LogIn,
  default: User,
};

const TONE_MAP = {
  upload: { bg: "var(--status-blue-bg)", color: "var(--status-blue)" },
  transfer: { bg: "var(--status-amber-bg)", color: "var(--status-amber)" },
  report: { bg: "var(--status-green-bg)", color: "var(--status-green)" },
  court: { bg: "var(--surface-sunken)", color: "var(--navy-700)" },
  user: { bg: "var(--status-blue-bg)", color: "var(--status-blue)" },
  warning: { bg: "var(--status-red-bg)", color: "var(--status-red)" },
  ai: { bg: "var(--status-green-bg)", color: "var(--accent-teal)" },
  login: { bg: "var(--surface-sunken)", color: "var(--text-secondary)" },
};

export default function ActivityFeed({ items }) {
  return (
    <div>
      {items.map((item, i) => {
        const Icon = ICON_MAP[item.icon] || ICON_MAP.default;
        const tone = TONE_MAP[item.icon] || TONE_MAP.login;
        return (
          <div className="activity-item" key={item.id || i}>
            <div className="activity-icon" style={{ background: tone.bg, color: tone.color }}>
              <Icon size={15} />
            </div>
            <div className="grow">
              <div className="activity-title">{item.title}</div>
              {item.desc && <div className="activity-desc">{item.desc}</div>}
              <div className="activity-time">{item.time}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
