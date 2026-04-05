import { useMemo } from "react";
import { useTransactions } from "../hooks/useTransactions";
import InsightCard from "../components/insights/InsightCard";
import IncomeExpenseChart from "../components/insights/IncomeExpenseChart";
import CategoryBreakdownTable from "../components/insights/CategoryBreakdownTable";
import EmptyState from "../components/common/EmptyState";
import {
  getHighestSpendingCategory,
  getMonthOverMonth,
  getNetSavingsThisMonth,
  getAvgMonthlyIncome,
  getMonthlyData
} from "../utils/insightCalculations";
import { formatCurrency } from "../utils/formatCurrency";

export default function InsightsPage() {
  const { transactions } = useTransactions();

  const highestCategory = useMemo(() => getHighestSpendingCategory(transactions), [transactions]);
  const mom = useMemo(() => getMonthOverMonth(transactions), [transactions]);
  const netSavings = useMemo(() => getNetSavingsThisMonth(transactions), [transactions]);
  const avgIncome = useMemo(() => getAvgMonthlyIncome(transactions), [transactions]);
  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);

  const mostActiveMonth = useMemo(() => {
    if (!monthlyData || monthlyData.length === 0) return null;
    let max = 0;
    let active = null;
    monthlyData.forEach(d => {
      const total = d.income + d.expense;
      if (total > max) {
        max = total;
        active = d.label; // e.g. "Mar 26" or similar
      }
    });
    return active;
  }, [monthlyData]);

  const totalIncome = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100) : 0;

  if (transactions.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Insights</h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">Understand your spending patterns</p>
        </div>
        <EmptyState message="No data to analyze" description="Add some transactions to see your financial insights" />
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Insights</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">Key observations from your financial data</p>
      </div>

      {/* Insight cards — grid mapping to requested wording */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        
        {/* Card 1 */}
        <InsightCard
          title="Top Spending Category"
          value={highestCategory.category || "N/A"}
          description={`${highestCategory.amount ? formatCurrency(highestCategory.amount) : "$0"} spent — your biggest expense bucket. Consider setting a budget here.`}
          icon={<span className="text-[17px]">🛍️</span>}
        />
        
        {/* Card 2 */}
        <InsightCard
          title="Savings Rate"
          value={`${savingsRate.toFixed(0)}%`}
          description="Great job! You're saving above the recommended 20% threshold."
          icon={<span className="text-[17px]">🐷</span>}
        />
        
        {/* Card 3 */}
        <InsightCard
          title="Month-On-Month Expenses"
          value={mom ? `${parseFloat(mom.change) >= 0 ? "+" : ""}${mom.change}%` : "N/A"}
          description={`Spending rose vs ${mom ? mom.previousMonth : "last month"}. Review discretionary categories.`}
          icon={<span className="text-[17px]">📈</span>}
        />
        
        {/* Card 4 */}
        <InsightCard
          title="Net Savings This Month"
          value={formatCurrency(netSavings.savings || 0)}
          description={`Income ${formatCurrency(netSavings.income || 0)} minus expenses ${formatCurrency(netSavings.expense || 0)}.`}
          icon={<span className="text-[17px]">🎯</span>}
        />
        
        {/* Card 5 */}
        <InsightCard
          title="Most Active Month"
          value={mostActiveMonth || "N/A"}
          description="The month with the highest combined income and expense activity."
          icon={<span className="text-[17px]">📊</span>}
        />
        
        {/* Card 6 */}
        <InsightCard
          title="Avg Monthly Income"
          value={formatCurrency(avgIncome || 0)}
          description="Average income across all recorded months in your history."
          icon={<span className="text-[17px]">💸</span>}
        />

      </div>

      {/* Charts section */}
      <div className="flex flex-col gap-6 mb-6">
        <IncomeExpenseChart />
        <CategoryBreakdownTable />
      </div>
    </div>
  );
}
