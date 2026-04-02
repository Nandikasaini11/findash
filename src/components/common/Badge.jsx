const typeStyles = {
  income: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  expense: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const categoryStyles = {
  Food: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Rent: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Salary: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Transport: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Entertainment: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  Healthcare: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Shopping: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Utilities: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
};

export default function Badge({ type, category }) {
  if (type) {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${typeStyles[type] || ""}`}>
        {type}
      </span>
    );
  }

  if (category) {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryStyles[category] || "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}>
        {category}
      </span>
    );
  }

  return null;
}
