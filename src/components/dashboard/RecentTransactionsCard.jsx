import { useMemo } from "react";
import Card from "../common/Card";
import { useTransactions } from "../../hooks/useTransactions";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/dateUtils";

export default function RecentTransactionsCard() {
  const { transactions } = useTransactions();

  const recent = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [transactions]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-400">Recent Transactions</h3>
      </div>

      <div className="space-y-4">
        {recent.map((t) => (
          <div key={t.id} className="flex flex-col border-b border-gray-100 dark:border-[#23242C] pb-3 last:border-0 last:pb-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{t.description}</span>
              <span className={`text-sm font-medium ${t.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {t.type === "income" ? "" : "-"}{formatCurrency(t.amount)}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">{t.category}</span>
              <span className="text-xs text-gray-500">{formatDate(t.date)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
