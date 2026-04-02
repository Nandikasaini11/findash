import { useMemo } from "react";
import { useTransactions } from "./useTransactions";
import { useFilters } from "./useFilters";

export function useFilteredTransactions() {
  const { transactions } = useTransactions();
  const { search, typeFilter, categoryFilter, sortBy, sortOrder } = useFilters();

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((t) =>
        t.description.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((t) => t.type === typeFilter);
    }

    if (categoryFilter !== "all") {
      result = result.filter((t) => t.category === categoryFilter);
    }

    result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "date") {
        cmp = a.date.localeCompare(b.date);
      } else {
        cmp = a.amount - b.amount;
      }
      return sortOrder === "asc" ? cmp : -cmp;
    });

    return result;
  }, [transactions, search, typeFilter, categoryFilter, sortBy, sortOrder]);

  return filtered;
}
