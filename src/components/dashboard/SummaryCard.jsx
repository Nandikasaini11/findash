import { formatCurrency } from "../../utils/formatCurrency";

const PALETTE = {
  violet: {
    iconBg: "bg-purple-100 dark:bg-purple-500/15",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  emerald: {
    iconBg: "bg-emerald-100 dark:bg-emerald-500/15",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  rose: {
    iconBg: "bg-rose-100 dark:bg-rose-500/15",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  amber: {
    iconBg: "bg-amber-100 dark:bg-amber-500/15",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  neutral: {
    iconBg: "bg-gray-100 dark:bg-white/5",
    iconColor: "text-gray-600 dark:text-gray-400",
  }
};

export default function SummaryCard({ title, amount, icon, subtitle, displayValue, cardAccent = "neutral" }) {
  const p = PALETTE[cardAccent] || PALETTE.neutral;
  const val = displayValue !== undefined ? displayValue : formatCurrency(amount);

  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 md:p-6 transition-all duration-300 bg-white dark:bg-[#121319] border border-gray-100 dark:border-[#23242C] shadow-sm`}>

      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${p.iconBg} ${p.iconColor}`}>
          {icon}
        </div>
        
        {/* Pill metric like +79% */}
        {subtitle && subtitle.includes("+") && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20">
            {subtitle.split(" ")[0]}
          </span>
        )}
      </div>

      {/* Amount */}
      <p className={`text-[28px] font-bold tracking-tight mb-1 text-gray-900 dark:text-white`}>{val}</p>

      {/* Title */}
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{title}</p>
      
      {subtitle && !subtitle.includes("+") && (
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
