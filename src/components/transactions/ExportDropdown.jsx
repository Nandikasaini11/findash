import { useState, useRef, useEffect } from "react";

export default function ExportDropdown({ getFilteredData }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const exportCSV = () => {
    const data = getFilteredData();
    const header = "Date,Description,Category,Type,Amount";
    const rows = data.map((t) =>
      `${t.date},"${t.description.replace(/"/g, '""')}",${t.category},${t.type},${t.amount}`
    );
    downloadFile([header, ...rows].join("\n"), "transactions.csv", "text/csv");
  };

  const exportJSON = () => {
    const data = getFilteredData();
    downloadFile(JSON.stringify(data, null, 2), "transactions.json", "application/json");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Export
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 animate-scaleIn origin-top-right">
          <button
            onClick={exportCSV}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-lg transition-colors"
          >
            Export as CSV
          </button>
          <button
            onClick={exportJSON}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-b-lg transition-colors"
          >
            Export as JSON
          </button>
        </div>
      )}
    </div>
  );
}
