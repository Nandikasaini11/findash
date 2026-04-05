import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "../../hooks/useTheme";
import Card from "../common/Card";
import { useTransactions } from "../../hooks/useTransactions";
import { getMonthKey } from "../../utils/dateUtils";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-lg bg-white dark:bg-[#181921] border border-gray-100 dark:border-[#23242C] text-xs shadow-xl">
        <p className="font-medium text-gray-900 dark:text-gray-300 mb-1">{label}</p>
        <p className="text-blue-600 dark:text-white">balance : {payload[0]?.value}</p>
      </div>
    );
  }
  return null;
};

export default function BalanceTrendChart() {
  const { transactions } = useTransactions();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const data = useMemo(() => {
    const months = {};
    transactions.forEach((t) => {
      const key = getMonthKey(t.date);
      if (!months[key]) months[key] = 0;
      months[key] += t.type === "income" ? t.amount : -t.amount;
    });
    let balance = 0;
    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, net]) => {
        balance += net;
        return {
          month: new Date(key + "-01T00:00:00").toLocaleDateString("en-US", { month: "short" }),
          balance: Math.round(balance * 100) / 100,
        };
      });
  }, [transactions]);

  return (
    <Card className="h-full">
      <div className="mb-5">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-400">Balance Trend</h3>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#23242C" : "#E5E7EB"} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: isDark ? "#6B7280" : "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: isDark ? "#6B7280" : "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="balance" stroke="#3B82F6" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: "#3B82F6", stroke: isDark ? "#181921" : "#FFFFFF", strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
