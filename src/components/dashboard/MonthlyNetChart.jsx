import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useTheme } from "../../hooks/useTheme";
import Card from "../common/Card";
import { useTransactions } from "../../hooks/useTransactions";
import { formatCurrency } from "../../utils/formatCurrency";
import { getMonthKey } from "../../utils/dateUtils";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const net = payload[0]?.value || 0;
    return (
      <div className="px-3 py-2 rounded-lg bg-white dark:bg-[#181921] border border-gray-100 dark:border-[#23242C] text-xs shadow-xl">
        <p className="font-medium text-gray-900 dark:text-gray-300 mb-1">{label}</p>
        <p className={net >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
          Net: {formatCurrency(net)}
        </p>
      </div>
    );
  }
  return null;
};

export default function MonthlyNetChart() {
  const { transactions } = useTransactions();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const data = useMemo(() => {
    const months = {};
    transactions.forEach((t) => {
      const key = getMonthKey(t.date);
      if (!months[key]) months[key] = { income: 0, expense: 0 };
      if (t.type === "income") months[key].income += t.amount;
      else months[key].expense += t.amount;
    });
    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, vals]) => ({
        month: new Date(key + "-01T00:00:00").toLocaleDateString("en-US", { month: "short" }),
        net: Math.round((vals.income - vals.expense) * 100) / 100,
      }));
  }, [transactions]);

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-400">Monthly Net</h3>
      </div>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={20} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#23242C" : "#E5E7EB"} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: isDark ? "#6B7280" : "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: isDark ? "#6B7280" : "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} width={36} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.05)' }} />
            <Bar dataKey="net" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.net >= 0 ? "#22C55E" : "#EF4444"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
