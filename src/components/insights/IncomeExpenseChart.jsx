import { useMemo } from "react";
import Card from "../common/Card";
import { useTransactions } from "../../hooks/useTransactions";
import { formatCurrency } from "../../utils/formatCurrency";
import { getMonthlyData } from "../../utils/insightCalculations";

export default function IncomeExpenseChart() {
  const { transactions } = useTransactions();
  
  const data = useMemo(() => getMonthlyData(transactions), [transactions]);
  const maxIncome = Math.max(...data.map(d => d.income), 1);

  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-400">Monthly Comparison</h3>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-1.5 rounded-full bg-green-500" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1.5 rounded-full bg-red-500" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Expenses</span>
        </div>
      </div>

      <div className="space-y-5">
        {data.map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-400">{row.label}</span>
              <div className="flex gap-4">
                <span className="text-xs font-bold text-green-600 dark:text-green-500">{formatCurrency(row.income)}</span>
                <span className="text-xs font-bold text-red-600 dark:text-red-500">{formatCurrency(row.expense)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-1.5 bg-gray-100 dark:bg-[#2A2B35] rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${(row.income / maxIncome) * 100}%` }} />
              </div>
              <div className="h-1.5 bg-gray-100 dark:bg-[#2A2B35] rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${(row.expense / maxIncome) * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
