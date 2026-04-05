export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl p-5 bg-white dark:bg-[#121319] border border-gray-100 dark:border-[#23242C] shadow-sm ${className}`}>
      {children}
    </div>
  );
}
