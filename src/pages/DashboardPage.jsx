import { useMemo } from "react";
import { useTransactions } from "../hooks/useTransactions";
import SummaryCard from "../components/dashboard/SummaryCard";
import BalanceTrendChart from "../components/dashboard/BalanceTrendChart";
import SpendingPieChart from "../components/dashboard/SpendingPieChart";
import EmptyState from "../components/common/EmptyState";

export default function DashboardPage() {
  const { transactions } = useTransactions();

  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
  }, [transactions]);

  if (transactions.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Dashboard
        </h1>
        <EmptyState
          message="No transactions yet"
          description="Add some transactions to see your financial overview"
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard
          title="Total Balance"
          amount={balance}
          color="bg-green-100 dark:bg-green-900/30"
          icon={
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
          }
        />
        <SummaryCard
          title="Total Income"
          amount={totalIncome}
          color="bg-blue-100 dark:bg-blue-900/30"
          icon={
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
            </svg>
          }
        />
        <SummaryCard
          title="Total Expenses"
          amount={totalExpenses}
          color="bg-red-100 dark:bg-red-900/30"
          icon={
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 00-4.306-6.43l-.776-2.898m0 0L5.022 8.648m3.182-5.51l5.511 3.181" />
            </svg>
          }
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BalanceTrendChart />
        <SpendingPieChart />
      </div>
    </div>
  );
}
