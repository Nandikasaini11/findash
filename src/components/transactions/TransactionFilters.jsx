import { useFilters } from "../../hooks/useFilters";
import { CATEGORIES } from "../../data/mockTransactions";

export default function TransactionFilters() {
  const {
    search, setSearch,
    typeFilter, setTypeFilter,
    categoryFilter, setCategoryFilter,
    sortBy, setSortBy,
    sortOrder, setSortOrder,
  } = useFilters();

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-gray-900 dark:text-gray-100 placeholder-gray-400"
        />
      </div>

      {/* Type filter */}
      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Category filter */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Sort buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => toggleSort("date")}
          className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
            sortBy === "date"
              ? "bg-accent text-white border-accent"
              : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-accent"
          }`}
        >
          Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button
          onClick={() => toggleSort("amount")}
          className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
            sortBy === "amount"
              ? "bg-accent text-white border-accent"
              : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-accent"
          }`}
        >
          Amount {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
      </div>
    </div>
  );
}
