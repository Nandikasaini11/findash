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

export default function Badge({ type, category }) {
  if (type) {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
        type === "income" 
          ? "bg-green-500/10 text-green-400 border border-green-500/20" 
          : "bg-red-500/10 text-red-400 border border-red-500/20"
      }`}>
        {type}
      </span>
    );
  }
  
  if (category) {
    const color = CATEGORY_COLORS[category] || "#6b7280";
    const icon = CATEGORY_ICONS[category] || "💳";
    const label = category === "Rent" ? "Housing" : category === "Food" ? "Food & Dining" : category;
    
    return (
      <span 
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap"
        style={{ 
          backgroundColor: `${color}15`, 
          color: color,
          border: `1px solid ${color}30`
        }}
      >
        {icon} {label}
      </span>
    );
  }
  
  return null;
}
