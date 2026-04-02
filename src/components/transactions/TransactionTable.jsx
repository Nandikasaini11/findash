import { useFilters } from "../../hooks/useFilters";
import { useRole } from "../../hooks/useRole";
import { useFilteredTransactions } from "../../hooks/useFilteredTransactions";
import TransactionRow from "./TransactionRow";
import EmptyState from "../common/EmptyState";

export default function TransactionTable({ onEdit }) {
  const { search, typeFilter, categoryFilter, clearFilters } = useFilters();
  const { role } = useRole();
  const filtered = useFilteredTransactions();

  const hasActiveFilters = search || typeFilter !== "all" || categoryFilter !== "all";

  if (filtered.length === 0) {
    return (
      <EmptyState
        message="No transactions found"
        description={hasActiveFilters ? "Try adjusting your search or filters" : "Add a transaction to get started"}
        onAction={hasActiveFilters ? clearFilters : undefined}
        actionLabel={hasActiveFilters ? "Clear Filters" : undefined}
      />
    );
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Type</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
            {role === "admin" && (
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {filtered.map((t) => (
            <TransactionRow key={t.id} transaction={t} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
