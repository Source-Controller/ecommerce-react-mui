import { useState } from "react";

export const usePagination = (limit) => {
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const handlePageChange = (_, page) => {
    setPage(page);
    setOffset((page - 1) * limit);
  };
  return { offset, page, handlePageChange };
};
