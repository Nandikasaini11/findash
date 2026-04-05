import { useState, useCallback } from "react";
import { useRole } from "../hooks/useRole";
import { useFilteredTransactions } from "../hooks/useFilteredTransactions";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionModal from "../components/transactions/TransactionModal";
import ExportDropdown from "../components/transactions/ExportDropdown";

export default function TransactionsPage() {
  const { role } = useRole();
  const filtered = useFilteredTransactions();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleAdd = () => { setEditingTransaction(null); setModalOpen(true); };
  const handleEdit = (txn) => { setEditingTransaction(txn); setModalOpen(true); };
  const handleClose = () => { setModalOpen(false); setEditingTransaction(null); };
  const getFilteredData = useCallback(() => filtered, [filtered]);

  return (
    <div>
      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">Manage and explore your transactions</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 mt-1">
          <ExportDropdown getFilteredData={getFilteredData} />
          {role === "admin" && (
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#3B82F6] hover:bg-blue-600 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Transaction
            </button>
          )}
        </div>
      </div>

      <TransactionFilters />
      <TransactionTable onEdit={handleEdit} />

      <TransactionModal isOpen={modalOpen} onClose={handleClose} transaction={editingTransaction} />
    </div>
  );
}
