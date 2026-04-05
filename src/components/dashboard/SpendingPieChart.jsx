import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../common/Card";
import { useTransactions } from "../../hooks/useTransactions";
import { formatCurrency } from "../../utils/formatCurrency";

const PIE_COLORS = {
  Food: "#A855F7",          // Purple
  Entertainment: "#22C55E", // Green
  Shopping: "#EC4899",      // Pink
  Rent: "#3B82F6",          // Blue
  Subscriptions: "#06B6D4", // Cyan
  Transport: "#EF4444",     // Red
  Utilities: "#EAB308",     // Yellow
  Healthcare: "#F97316",    // Orange
  Other: "#8B5CF6",
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-lg bg-white dark:bg-[#181921] border border-gray-100 dark:border-[#23242C] text-xs shadow-xl">
        <p className="font-bold text-gray-900 dark:text-gray-200 mb-0.5">{payload[0].name}</p>
        <p style={{ color: payload[0].payload.fill }}>{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function SpendingPieChart() {
  const { transactions } = useTransactions();

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
        fill: PIE_COLORS[name] || PIE_COLORS.Other 
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <Card className="h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-400">Spending by Category</h3>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Donut Chart */}
        <div className="w-48 h-48 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend beneath the chart */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-auto">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-1.5 text-xs">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: entry.fill }} />
              <span className="text-gray-700 dark:text-gray-400">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
