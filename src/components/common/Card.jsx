export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:-translate-y-0.5 transition-transform duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
