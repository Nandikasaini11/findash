import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import Card from "../common/Card";
import { useTransactions } from "../../hooks/useTransactions";
import { useTheme } from "../../hooks/useTheme";
import { getMonthlyData } from "../../utils/insightCalculations";
import { formatCurrency } from "../../utils/formatCurrency";

export default function IncomeExpenseChart() {
  const { transactions } = useTransactions();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const data = useMemo(() => getMonthlyData(transactions), [transactions]);

  return (
    <Card>
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Monthly Income vs Expenses
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#374151" : "#e5e7eb"}
            />
            <XAxis
              dataKey="label"
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
              formatter={(value) => [formatCurrency(value)]}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px" }}
            />
            <Bar
              dataKey="income"
              name="Income"
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expense"
              name="Expenses"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
