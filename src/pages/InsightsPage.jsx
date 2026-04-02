import { useMemo } from "react";
import { useTransactions } from "../hooks/useTransactions";
import InsightCard from "../components/insights/InsightCard";
import IncomeExpenseChart from "../components/insights/IncomeExpenseChart";
import SmartObservations from "../components/insights/SmartObservations";
import EmptyState from "../components/common/EmptyState";
import {
  getHighestSpendingCategory,
  getMonthOverMonth,
} from "../utils/insightCalculations";
import { formatCurrency } from "../utils/formatCurrency";

export default function InsightsPage() {
  const { transactions } = useTransactions();

  const highestCategory = useMemo(
    () => getHighestSpendingCategory(transactions),
    [transactions]
  );

  const mom = useMemo(
    () => getMonthOverMonth(transactions),
    [transactions]
  );

  if (transactions.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Insights
        </h1>
        <EmptyState
          message="No data to analyze"
          description="Add some transactions to see your financial insights"
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Insights
      </h1>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InsightCard
          title="Highest Spending Category"
          value={highestCategory.category || "N/A"}
          description={
            highestCategory.amount
              ? `Total: ${formatCurrency(highestCategory.amount)}`
              : undefined
          }
          color="bg-violet-100 dark:bg-violet-900/30"
          icon={
            <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          }
        />
        {mom && (
          <InsightCard
            title="Monthly Spending Change"
            value={`${parseFloat(mom.change) >= 0 ? "+" : ""}${mom.change}%`}
            description={`${mom.previousMonth} → ${mom.currentMonth}`}
            color={
              parseFloat(mom.change) >= 0
                ? "bg-red-100 dark:bg-red-900/30"
                : "bg-green-100 dark:bg-green-900/30"
            }
            icon={
              <svg
                className={`w-5 h-5 ${
                  parseFloat(mom.change) >= 0
                    ? "text-red-600 dark:text-red-400"
                    : "text-green-600 dark:text-green-400"
                }`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-4.5L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
              </svg>
            }
          />
        )}
      </div>

      {/* Bar Chart */}
      <div className="mb-6">
        <IncomeExpenseChart />
      </div>

      {/* Smart Observations */}
      <SmartObservations />
    </div>
  );
}
