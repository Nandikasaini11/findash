import Card from "../common/Card";
import { formatCurrency } from "../../utils/formatCurrency";

export default function SummaryCard({ title, amount, icon, color, trend }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
            {formatCurrency(amount)}
          </p>
          {trend !== undefined && (
            <p className={`text-xs mt-1 font-medium ${trend >= 0 ? "text-green-500" : "text-red-500"}`}>
              {trend >= 0 ? "+" : ""}{trend.toFixed(1)}% from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
