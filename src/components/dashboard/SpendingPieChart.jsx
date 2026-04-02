import { useMemo } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import Card from "../common/Card";
import { useTransactions } from "../../hooks/useTransactions";
import { useTheme } from "../../hooks/useTheme";
import { CATEGORY_COLORS } from "../../data/mockTransactions";
import { formatCurrency } from "../../utils/formatCurrency";

export default function SpendingPieChart() {
  const { transactions } = useTransactions();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const data = useMemo(() => {
    const byCategory = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
      });

    return Object.entries(byCategory)
      .map(([name, value]) => ({
        name,
        value: Math.round(value * 100) / 100,
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <Card className="h-full">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Spending by Category
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name] || "#6b7280"}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#fff",
                border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                borderRadius: "8px",
                color: isDark ? "#f3f4f6" : "#111827",
              }}
            formatter={(value, name) => [formatCurrency(value), name]}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", color: isDark ? "#9ca3af" : "#6b7280" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
