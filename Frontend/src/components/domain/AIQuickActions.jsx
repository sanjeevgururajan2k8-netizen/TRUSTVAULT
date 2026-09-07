import {
  FileSearch, ListChecks, GitCommitVertical, Users, Microscope, AlertCircle,
} from "lucide-react";

const ICONS = {
  summarize_case: FileSearch,
  key_points: ListChecks,
  timeline: GitCommitVertical,
  summarize_witnesses: Users,
  summarize_forensic: Microscope,
  missing_info: AlertCircle,
};

export default function AIQuickActions({ actions, onSelect, disabled }) {
  return (
    <div className="ai-quick-grid">
      {Object.entries(actions).map(([key, action]) => {
        const Icon = ICONS[key] || FileSearch;
        return (
          <button key={key} className="ai-quick-btn" onClick={() => onSelect(key)} disabled={disabled}>
            <Icon size={16} />
            {action.label}
          </button>
        );
      })}
    </div>
  );
}
