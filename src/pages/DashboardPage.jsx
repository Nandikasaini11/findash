import { useMemo } from "react";
import { useTransactions } from "../hooks/useTransactions";
import SummaryCard from "../components/dashboard/SummaryCard";
import BalanceTrendChart from "../components/dashboard/BalanceTrendChart";
import SpendingPieChart from "../components/dashboard/SpendingPieChart";
import MonthlyNetChart from "../components/dashboard/MonthlyNetChart";
import RecentTransactionsCard from "../components/dashboard/RecentTransactionsCard";
import EmptyState from "../components/common/EmptyState";

export default function DashboardPage() {
  const { transactions } = useTransactions();

  const { totalIncome, totalExpenses, balance, savingsRate, txnCount } = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const savingsRate = totalIncome > 0
      ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)
      : "0.0";
    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      savingsRate,
      txnCount: transactions.length,
    };
  }, [transactions]);

  const incomeCount = transactions.filter(t => t.type === "income").length;
  const expenseCount = transactions.filter(t => t.type === "expense").length;

  if (transactions.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Your financial overview at a glance</p>
        </div>
        <EmptyState message="No transactions yet" description="Add some transactions to see your financial overview" />
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">Your financial overview at a glance</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Net Balance"
          amount={balance}
          cardAccent="violet"
          subtitle={`+${savingsRate}% savings`}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6" />
            </svg>
          }
        />
        <SummaryCard
          title="Total Income"
          amount={totalIncome}
          cardAccent="emerald"
          subtitle="+12.4% vs last period"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
            </svg>
          }
        />
        <SummaryCard
          title="Total Expense"
          amount={totalExpenses}
          cardAccent="rose"
          subtitle="+5.2% vs last period"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 00-4.306-6.43l-.776-2.898m0 0L5.022 8.648m3.182-5.51l5.511 3.181" />
            </svg>
          }
        />
        <SummaryCard
          title="Savings Rate"
          displayValue={`${savingsRate}%`}
          cardAccent="amber"
          subtitle="Of total income saved"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
            </svg>
          }
        />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <BalanceTrendChart />
        </div>
        <SpendingPieChart />
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <MonthlyNetChart />
        <RecentTransactionsCard />
      </div>
    </div>
  );
}
