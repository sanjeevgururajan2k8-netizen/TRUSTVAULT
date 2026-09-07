import { getSubmittedCourtCases, getEvidenceByCase, getCustody } from "../../data/api";
import VerticalTimeline from "../../components/domain/VerticalTimeline";
import EmptyState from "../../components/ui/EmptyState";
import { ScrollText } from "lucide-react";

export default function CourtCustody() {
  const cases = getSubmittedCourtCases();
  const evidence = cases.flatMap((c) => getEvidenceByCase(c.id).map((e) => ({ ...e, caseTitle: c.title })));

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Judicial Review</div>
          <h1 className="page-title">Chain of Custody</h1>
          <p className="page-desc">Complete custody history for every evidence item — who handled it, when, and whether the hash was preserved.</p>
        </div>
      </div>
      {evidence.length === 0 ? (
        <EmptyState icon={ScrollText} title="No custody records to review" />
      ) : (
        <div className="stack-y">
          {evidence.map((e) => (
            <div key={e.id} className="card card-pad">
              <div style={{ marginBottom: 14 }}>
                <div className="font-mono text-xs text-muted">{e.caseId} · {e.caseTitle}</div>
                <div className="font-semibold text-md">{e.id} — {e.name}</div>
              </div>
              <VerticalTimeline events={getCustody(e.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
