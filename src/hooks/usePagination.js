import { useState } from "react";

export const usePagination = (limit) => {
  const [offset, setOffset] = useState(0);

  const handlePageChange = (_, page) => {
    setOffset((page - 1) * limit);
  };
  return { offset, handlePageChange };
};
