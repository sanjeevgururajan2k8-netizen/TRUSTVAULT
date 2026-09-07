import { useMemo, useState, useEffect } from "react";

export default function usePagination(items, pageSize = 8) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));

  useEffect(() => {
    if (page > pageCount) setPage(1);
  }, [pageCount, page]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  return {
    page,
    setPage,
    pageCount,
    pageItems,
    total: items.length,
    pageSize,
  };
}
