import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, pageCount, total, pageSize, onPageChange }) {
  if (pageCount <= 1 && total <= pageSize) return null;

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const pages = [];
  for (let p = Math.max(1, page - 1); p <= Math.min(pageCount, page + 1); p++) pages.push(p);

  return (
    <div className="pagination">
      <span className="text-xs text-muted">
        Showing <b className="text-primary-c">{start}–{end}</b> of <b className="text-primary-c">{total}</b>
      </span>
      <div className="pagination-btns">
        <button className="page-btn" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
          <ChevronLeft size={14} />
        </button>
        {pages[0] > 1 && <span className="page-btn" style={{ border: "none", background: "none" }}>…</span>}
        {pages.map((p) => (
          <button key={p} className={`page-btn ${p === page ? "active" : ""}`} onClick={() => onPageChange(p)}>
            {p}
          </button>
        ))}
        {pages[pages.length - 1] < pageCount && <span className="page-btn" style={{ border: "none", background: "none" }}>…</span>}
        <button className="page-btn" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} aria-label="Next page">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
