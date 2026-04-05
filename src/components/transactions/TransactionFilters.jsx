import { useFilters } from "../../hooks/useFilters";
import { CATEGORIES } from "../../data/mockTransactions";
import { useFilteredTransactions } from "../../hooks/useFilteredTransactions";
import { formatCurrency } from "../../utils/formatCurrency";

export default function TransactionFilters() {
  const {
    search, setSearch,
    typeFilter, setTypeFilter,
    categoryFilter, setCategoryFilter,
    sortBy, setSortBy,
    sortOrder, setSortOrder,
  } = useFilters();

  const filtered = useFilteredTransactions();
  const totalIncome = filtered.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = filtered.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  const toggleSort = (field) => {
    if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else { setSortBy(field); setSortOrder("desc"); }
  };

  const inputBase = "text-sm bg-white dark:bg-[#181921] border border-gray-200 dark:border-[#23242C] rounded-lg text-gray-900 dark:text-gray-200 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 transition-colors placeholder-gray-400 dark:placeholder-gray-600";

  return (
    <div className="space-y-4 mb-6">
      {/* Search + filter row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 ${inputBase}`}
          />
        </div>

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className={`px-3 py-2 ${inputBase} cursor-pointer`}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
          className={`px-3 py-2 ${inputBase} cursor-pointer`}>
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <div className="flex items-center gap-2">
          {["date", "amount"].map((field) => (
            <button key={field} onClick={() => toggleSort(field)}
              className={`text-xs px-3 py-2 rounded-lg transition-colors font-medium border ${
                sortBy === field
                  ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                  : "bg-white dark:bg-[#181921] text-gray-600 dark:text-gray-500 border-gray-200 dark:border-[#23242C] hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)} {sortBy === field && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
          ))}
        </div>
      </div>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white dark:bg-[#181921] text-gray-600 dark:text-gray-500 border border-gray-200 dark:border-[#23242C]">
          Showing <strong className="text-gray-900 dark:text-white font-semibold ml-0.5">{filtered.length}</strong> results
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20">
          Income: {formatCurrency(totalIncome)}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20">
          Expenses: {formatCurrency(totalExpense)}
        </span>
      </div>
    </div>
  );
}
