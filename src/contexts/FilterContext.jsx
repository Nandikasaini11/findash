import { createContext, useState, useCallback } from "react";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const clearFilters = useCallback(() => {
    setSearch("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setSortBy("date");
    setSortOrder("desc");
  }, []);

  return (
    <FilterContext.Provider
      value={{
        search, setSearch,
        typeFilter, setTypeFilter,
        categoryFilter, setCategoryFilter,
        sortBy, setSortBy,
        sortOrder, setSortOrder,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
