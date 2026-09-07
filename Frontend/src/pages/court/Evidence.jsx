import { getSubmittedCourtCases, getEvidenceByCase } from "../../data/api";
import CourtEvidenceReview from "../../components/domain/CourtEvidenceReview";
import EmptyState from "../../components/ui/EmptyState";
import { Shield } from "lucide-react";

export default function CourtEvidence() {
  const cases = getSubmittedCourtCases();
  const evidence = cases.flatMap((c) => getEvidenceByCase(c.id));

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Judicial Review</div>
          <h1 className="page-title">Evidence Review</h1>
          <p className="page-desc">Verify the integrity of every evidence item across submitted cases.</p>
        </div>
      </div>
      {evidence.length === 0 ? (
        <EmptyState icon={Shield} title="No evidence to review" description="Evidence from submitted cases will appear here." />
      ) : (
        <div className="grid-evidence">
          {evidence.map((e) => <CourtEvidenceReview key={e.id} evidence={e} />)}
        </div>
      )}
    </div>
  );
}
