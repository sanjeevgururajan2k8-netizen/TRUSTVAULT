import { useMemo, useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { SkeletonTable } from "../ui/LoadingSkeleton";
import EmptyState from "../ui/EmptyState";

/**
 * Generic, reusable data table.
 * columns: [{ key, header, render?(row), sortable?, sortValue?(row), align?, width? }]
 */
export default function DataTable({
  columns,
  data,
  keyField = "id",
  onRowClick,
  loading = false,
  emptyTitle = "No records found",
  emptyDesc = "There is nothing to show here yet.",
  defaultSort,
}) {
  const [sort, setSort] = useState(defaultSort || null);

  const sorted = useMemo(() => {
    if (!sort) return data;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return data;
    const getVal = col.sortValue || ((row) => row[col.key]);
    const arr = [...data].sort((a, b) => {
      const av = getVal(a);
      const bv = getVal(b);
      if (av === bv) return 0;
      return av > bv ? 1 : -1;
    });
    if (sort.dir === "desc") arr.reverse();
    return arr;
  }, [data, sort, columns]);

  if (loading) return <SkeletonTable cols={columns.length} />;

  if (!data.length) {
    return <EmptyState title={emptyTitle} description={emptyDesc} />;
  }

  const toggleSort = (col) => {
    if (!col.sortable) return;
    setSort((prev) => {
      if (!prev || prev.key !== col.key) return { key: col.key, dir: "asc" };
      if (prev.dir === "asc") return { key: col.key, dir: "desc" };
      return null;
    });
  };

  return (
    <div className="table-wrap">
      <table className="dtable">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={col.sortable ? "sortable" : ""}
                style={{ width: col.width, textAlign: col.align }}
                onClick={() => toggleSort(col)}
              >
                <span className="flex items-center gap-4">
                  {col.header}
                  {col.sortable &&
                    (sort?.key === col.key ? (
                      sort.dir === "asc" ? (
                        <ArrowUp size={12} />
                      ) : (
                        <ArrowDown size={12} />
                      )
                    ) : (
                      <ArrowUpDown size={12} style={{ opacity: 0.4 }} />
                    ))}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr
              key={row[keyField]}
              className={onRowClick ? "clickable" : ""}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td key={col.key} style={{ textAlign: col.align }}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
