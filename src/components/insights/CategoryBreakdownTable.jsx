import { useMemo } from "react";
import Card from "../common/Card";
import { useTransactions } from "../../hooks/useTransactions";
import { formatCurrency } from "../../utils/formatCurrency";

const CATEGORY_COLORS = {
  Food: "#F97316",           // Orange
  Rent: "#A855F7",           // Purple
  Salary: "#22C55E",         // Green
  Transport: "#3B82F6",      // Blue
  Entertainment: "#EC4899",  // Pink
  Healthcare: "#14B8A6",     // Teal
  Shopping: "#EAB308",       // Yellow
  Utilities: "#06B6D4",      // Cyan
};

const CATEGORY_ICONS = {
  Food: "🍔", Rent: "🏠", Salary: "💼", Transport: "🚗",
  Entertainment: "🎬", Healthcare: "💊", Shopping: "🛍️", Utilities: "⚡",
};

const MEDALS = ["🥇", "🥈", "🥉"];

export default function CategoryBreakdownTable() {
  const { transactions } = useTransactions();

  const { categories, totalExpense } = useMemo(() => {
    const map = {};
    transactions.filter(t => t.type === "expense").forEach(t => {
      // Map Housing to Rent if they named it Housing in the screenshot, but our data uses Rent
      const categoryName = t.category;
      map[categoryName] = (map[categoryName] || 0) + t.amount;
    });
    const total = Object.values(map).reduce((s, v) => s + v, 0);
    const sorted = Object.entries(map).sort(([, a], [, b]) => b - a);
    return { categories: sorted, totalExpense: total };
  }, [transactions]);

  return (
    <Card className="!p-0 border-gray-100 dark:border-[#23242C] overflow-hidden">
      <div className="p-5 border-b border-gray-100 dark:border-[#23242C] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200">Full Category Breakdown</h3>
          <p className="text-xs text-gray-500 mt-0.5">All spending categories ranked</p>
        </div>
        <span className="text-lg">🏆</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-[#23242C] bg-gray-50 dark:bg-[#121319]">
              <th className="px-5 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest w-12 text-center">#</th>
              <th className="px-5 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Category</th>
              <th className="px-5 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Spent</th>
              <th className="px-5 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest hidden sm:table-cell">% Of Expenses</th>
              <th className="px-5 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest hidden md:table-cell">Visual</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#181921] divide-y divide-gray-100 dark:divide-[#23242C]">
            {categories.map(([category, amount], i) => {
              const pct = totalExpense > 0 ? (amount / totalExpense * 100) : 0;
              const color = CATEGORY_COLORS[category] || "#6b7280";
              const icon = CATEGORY_ICONS[category] || "💳";
              
              // Map label if it matches screenshot closely
              const label = category === "Rent" ? "Housing" : category === "Food" ? "Food & Dining" : category;

              return (
                <tr key={category} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 text-center">
                    {i < 3 ? <span className="text-base">{MEDALS[i]}</span> : <span className="text-xs text-gray-500 font-medium">#{i + 1}</span>}
                  </td>
                  <td className="px-5 py-4">
                    <span 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
                      style={{ 
                        backgroundColor: `${color}15`, 
                        color: color,
                        border: `1px solid ${color}30`
                      }}
                    >
                      {icon} {label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-gray-900 dark:text-gray-200">
                    {formatCurrency(amount)}
                  </td>
                  <td className="px-5 py-4 text-xs font-medium text-gray-400 hidden sm:table-cell">
                    {pct.toFixed(1)}%
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="w-28 h-1.5 bg-gray-100 dark:bg-[#2A2B35] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
