import Badge from "../common/Badge";
import { useRole } from "../../hooks/useRole";
import { formatDate } from "../../utils/dateUtils";
import { formatCurrency } from "../../utils/formatCurrency";

export default function TransactionRow({ transaction, onEdit }) {
  const { role } = useRole();

  return (
    <tr className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
        {formatDate(transaction.date)}
      </td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
        {transaction.description}
      </td>
      <td className="px-4 py-3">
        <Badge category={transaction.category} />
      </td>
      <td className="px-4 py-3 hidden sm:table-cell">
        <Badge type={transaction.type} />
      </td>
      <td className={`px-4 py-3 text-sm font-semibold whitespace-nowrap ${
        transaction.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
      }`}>
        {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
      </td>
      {role === "admin" && (
        <td className="px-4 py-3">
          <button
            onClick={() => onEdit(transaction)}
            className="text-gray-400 hover:text-accent transition-colors"
            title="Edit transaction"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
        </td>
      )}
    </tr>
  );
}
