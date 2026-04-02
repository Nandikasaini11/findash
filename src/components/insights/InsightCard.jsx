import Card from "../common/Card";

export default function InsightCard({ title, value, description, icon, color }) {
  return (
    <Card>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
            {value}
          </p>
          {description && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
