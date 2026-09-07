import { Link } from "react-router-dom";
import { Video, Image as ImageIcon, Music, FileText, Smartphone, Eye, ShieldCheck, History } from "lucide-react";
import { IntegrityBadge } from "../ui/StatusBadge";
import StatusBadge from "../ui/StatusBadge";
import { formatDate, truncateHash } from "../../utils/helpers";

const TYPE_ICON = {
  CCTV: Video,
  Video: Video,
  Image: ImageIcon,
  Audio: Music,
  Document: FileText,
  "Mobile Extraction": Smartphone,
};

export default function EvidenceCard({ evidence, viewHref, showCase = true }) {
  const Icon = TYPE_ICON[evidence.type] || FileText;
  return (
    <div className="evidence-card card-hover">
      <div className="evidence-card-top">
        <div className="evidence-type-icon">
          <Icon size={20} />
        </div>
        <div className="grow" style={{ minWidth: 0 }}>
          <div className="evidence-id">{evidence.id}</div>
          <div className="evidence-name truncate" title={evidence.name}>{evidence.name}</div>
        </div>
      </div>

      <dl className="evidence-meta-grid">
        {showCase && (
          <>
            <dt>Case</dt>
            <dd className="truncate">{evidence.caseId}</dd>
          </>
        )}
        <dt>Type</dt>
        <dd>{evidence.type}</dd>
        <dt>Uploaded</dt>
        <dd>{formatDate(evidence.uploadDate)}</dd>
        <dt>Status</dt>
        <dd><StatusBadge status={evidence.status} /></dd>
      </dl>

      <div className="evidence-hash-row">
        <ShieldCheck size={13} />
        SHA-256: {truncateHash(evidence.hashCurrent)}
      </div>

      <IntegrityBadge status={evidence.integrityStatus} />

      <div className="evidence-card-actions">
        <Link className="btn btn-secondary btn-sm" to={viewHref}>
          <Eye size={14} /> View
        </Link>
        <Link className="btn btn-ghost btn-sm" to={`${viewHref}?tab=custody`}>
          <History size={14} /> Track Custody
        </Link>
      </div>
    </div>
  );
}
