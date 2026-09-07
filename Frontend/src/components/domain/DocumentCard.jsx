import { FileText, Download, Eye, RefreshCw } from "lucide-react";
import { formatDate } from "../../utils/helpers";

export default function DocumentCard({ title, fileName, date, dateLabel = "Filed", onView, onDownload, onReplace }) {
  return (
    <div className="card card-pad flex items-center gap-16" style={{ flexWrap: "wrap" }}>
      <div className="evidence-type-icon" style={{ background: "var(--status-blue-bg)", color: "var(--status-blue)" }}>
        <FileText size={20} />
      </div>
      <div className="grow" style={{ minWidth: 180 }}>
        <div className="font-semibold text-md">{title}</div>
        <div className="text-xs text-muted font-mono">{fileName}</div>
        {date && <div className="text-xs text-muted" style={{ marginTop: 2 }}>{dateLabel}: {formatDate(date)}</div>}
      </div>
      <div className="row-actions">
        {onView && (
          <button className="btn btn-secondary btn-sm" onClick={onView}>
            <Eye size={14} /> View Document
          </button>
        )}
        {onDownload && (
          <button className="btn btn-ghost btn-sm" onClick={onDownload}>
            <Download size={14} /> Download
          </button>
        )}
        {onReplace && (
          <button className="btn btn-ghost btn-sm" onClick={onReplace}>
            <RefreshCw size={14} /> Replace
          </button>
        )}
      </div>
    </div>
  );
}
