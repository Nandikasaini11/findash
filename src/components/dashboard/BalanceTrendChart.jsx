import { useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import Card from "../common/Card";
import { useTransactions } from "../../hooks/useTransactions";
import { useTheme } from "../../hooks/useTheme";
import { getMonthKey } from "../../utils/dateUtils";
import { formatCurrency } from "../../utils/formatCurrency";

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
          month: new Date(key + "-01T00:00:00").toLocaleDateString("en-US", {
            month: "short",
          }),
          balance: Math.round(balance * 100) / 100,
        };
      });
  }, [transactions]);

  return (
    <Card className="h-full">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Balance Trend
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#374151" : "#e5e7eb"}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: isDark ? "#374151" : "#e5e7eb" }}
            />
            <YAxis
              tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: isDark ? "#374151" : "#e5e7eb" }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#fff",
                border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                borderRadius: "8px",
                color: isDark ? "#f3f4f6" : "#111827",
              }}
              formatter={(value) => [formatCurrency(value), "Balance"]}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ fill: "#22c55e", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
