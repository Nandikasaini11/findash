import Badge from "../common/Badge";
import { useRole } from "../../hooks/useRole";
import { useTransactions } from "../../hooks/useTransactions";
import { formatDate } from "../../utils/dateUtils";
import { formatCurrency } from "../../utils/formatCurrency";

export default function TransactionRow({ transaction, onEdit }) {
  const { role } = useRole();
  const { deleteTransaction } = useTransactions();

  return (
    <tr className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-[#23242C] last:border-0 text-sm">
      <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
        {formatDate(transaction.date)}
      </td>
      <td className="px-5 py-4">
        <span className="font-medium text-gray-900 dark:text-gray-200">{transaction.description}</span>
      </td>
      <td className="px-5 py-4">
        <Badge category={transaction.category} />
      </td>
      <td className="px-5 py-4 hidden sm:table-cell">
        <Badge type={transaction.type} />
      </td>
      <td className={`px-5 py-4 font-medium whitespace-nowrap text-right ${transaction.type === "income" ? "text-green-600 dark:text-[#22C55E]" : "text-gray-900 dark:text-white"}`}>
        {transaction.type === "income" ? "" : "-"}{formatCurrency(transaction.amount)}
      </td>
      {role === "admin" && (
        <td className="px-5 py-4 w-16 text-right">
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(transaction)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white" title="Edit">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
              </svg>
            </button>
            <button onClick={() => { if (window.confirm("Delete this transaction?")) deleteTransaction(transaction.id); }} className="text-gray-500 hover:text-red-400" title="Delete">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916" />
              </svg>
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
