import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Plus, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getCasesForUser, getEvidenceByCase } from "../../data/api";
import EvidenceCard from "../../components/domain/EvidenceCard";
import SearchBar from "../../components/ui/SearchBar";
import EmptyState from "../../components/ui/EmptyState";

const FILTERS = [
  { key: "All", match: () => true },
  { key: "Images", match: (t) => t === "Image" },
  { key: "Videos", match: (t) => t === "Video" || t === "CCTV" },
  { key: "Audio", match: (t) => t === "Audio" },
  { key: "Documents", match: (t) => t === "Document" || t === "Mobile Extraction" },
  { key: "CCTV", match: (t) => t === "CCTV" },
];

export default function InvestigationEvidence() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const caseFilter = params.get("case");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const cases = getCasesForUser(user);
  const allEvidence = useMemo(() => cases.flatMap((c) => getEvidenceByCase(c.id)), [cases]);
  const scoped = caseFilter ? allEvidence.filter((e) => e.caseId === caseFilter) : allEvidence;

  const active = FILTERS.find((f) => f.key === filter) || FILTERS[0];
  const filtered = scoped.filter(
    (e) =>
      active.match(e.type) &&
      (!query || e.id.toLowerCase().includes(query.toLowerCase()) || e.name.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Digital Evidence Management</div>
          <h1 className="page-title">Evidence{caseFilter ? ` — ${caseFilter}` : ""}</h1>
          <p className="page-desc">Every digital evidence item across your assigned cases, secured and fingerprinted.</p>
        </div>
        <div className="page-actions">
          <Link className="btn btn-primary" to={`/investigation/evidence/upload${caseFilter ? `?case=${caseFilter}` : ""}`}>
            <Plus size={15} /> Upload Evidence
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between gap-12 flex-wrap" style={{ marginBottom: 18 }}>
        <div className="chip-row">
          {FILTERS.map((f) => (
            <button key={f.key} className={`chip ${filter === f.key ? "active" : ""}`} onClick={() => setFilter(f.key)}>
              {f.key}
            </button>
          ))}
        </div>
        <SearchBar value={query} onChange={setQuery} placeholder="Search evidence ID or name…" className="" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Shield} title="No evidence found" description="Try a different filter, or upload new evidence for this case." />
      ) : (
        <div className="grid-evidence">
          {filtered.map((e) => (
            <EvidenceCard key={e.id} evidence={e} viewHref={`/investigation/evidence/${e.id}`} />
          ))}
        </div>
      )}
    </div>
  );
}
