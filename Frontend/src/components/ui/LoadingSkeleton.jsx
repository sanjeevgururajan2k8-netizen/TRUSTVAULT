export function SkeletonLine({ width = "100%" }) {
  return <div className="skeleton skel-line" style={{ width }} />;
}

export function SkeletonCard() {
  return <div className="skeleton skel-card" />;
}

export function SkeletonTable({ rows = 5, cols = 5 }) {
  return (
    <div className="table-wrap">
      <table className="dtable">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i}>
                <div className="skeleton skel-line" style={{ width: 70 }} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c}>
                  <div className="skeleton skel-line" style={{ width: c === 0 ? 90 : "80%", marginBottom: 0 }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SkeletonKpis({ count = 4 }) {
  return (
    <div className="grid-kpis">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
