import { CheckCircle2, XCircle } from "lucide-react";
import { getCustody } from "../../data/api";
import { truncateHash } from "../../utils/helpers";

/** Court-facing evidence integrity comparison card (SRS FR-29). */
export default function CourtEvidenceReview({ evidence }) {
  const custody = getCustody(evidence.id);
  const custodyComplete = custody.length >= 2;
  const match = evidence.hashOriginal === evidence.hashCurrent;

  return (
    <div className="card card-pad">
      <div className="flex items-center justify-between flex-wrap gap-8" style={{ marginBottom: 12 }}>
        <div>
          <div className="font-mono text-xs text-muted">{evidence.id}</div>
          <div className="font-semibold text-md">{evidence.name}</div>
          <div className="text-xs text-muted">{evidence.type}</div>
        </div>
        {match ? (
          <span className="badge badge-green badge-lg"><CheckCircle2 size={14} /> MATCH</span>
        ) : (
          <span className="badge badge-red badge-lg"><XCircle size={14} /> MISMATCH</span>
        )}
      </div>

      <div className="grid-2-eq">
        <div>
          <div className="text-xs text-muted font-semibold uppercase" style={{ marginBottom: 4 }}>Original Hash</div>
          <div className="hash-value" style={{ margin: 0 }}>{truncateHash(evidence.hashOriginal, 8, 8)}</div>
        </div>
        <div>
          <div className="text-xs text-muted font-semibold uppercase" style={{ marginBottom: 4 }}>Current Hash</div>
          <div className="hash-value" style={{ margin: 0, borderColor: match ? "var(--border-default)" : "var(--status-red-border)" }}>
            {truncateHash(evidence.hashCurrent, 8, 8)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between" style={{ marginTop: 12 }}>
        <span className="text-xs text-muted">Chain of Custody</span>
        <span className={`badge ${custodyComplete ? "badge-green" : "badge-amber"}`}>
          {custodyComplete ? "Complete" : "Incomplete"}
        </span>
      </div>
    </div>
  );
}
