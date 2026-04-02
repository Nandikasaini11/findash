export default function EmptyState({ message = "No data found", description = "", onAction, actionLabel }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">{message}</h3>
      {description && (
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{description}</p>
      )}
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-dark rounded-lg transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
