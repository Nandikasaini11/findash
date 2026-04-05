import { useFilters } from "../../hooks/useFilters";
import { useRole } from "../../hooks/useRole";
import { useFilteredTransactions } from "../../hooks/useFilteredTransactions";
import TransactionRow from "./TransactionRow";
import EmptyState from "../common/EmptyState";
import Card from "../common/Card";

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
    <Card className="!p-0 border-gray-100 dark:border-[#23242C] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-[#23242C] bg-gray-50 dark:bg-[#181921]">
              <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Type</th>
              <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Amount</th>
              {role === "admin" && <th className="px-5 py-3 w-16"></th>}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#121319] divide-y divide-gray-100 dark:divide-[#23242C]">
            {filtered.map((t) => (
              <TransactionRow key={t.id} transaction={t} onEdit={onEdit} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
