import Card from "../common/Card";

export default function InsightCard({ title, value, description, icon }) {
  return (
    <Card className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors duration-200 cursor-default">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-[#181921] border border-gray-200 dark:border-[#23242C] rounded-lg">
          <span className="text-xl">{icon}</span>
        </div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          {title}
        </p>
      </div>

      <p className="text-[26px] tracking-tight font-bold text-gray-900 dark:text-white mb-2">
        {value}
      </p>

      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </Card>
  );
}
