import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { useTransactions } from "../../hooks/useTransactions";
import { CATEGORIES } from "../../data/mockTransactions";

export default function TransactionModal({ isOpen, onClose, transaction }) {
  const { addTransaction, editTransaction } = useTransactions();
  const isEdit = !!transaction;

  const [form, setForm] = useState({
    date: "",
    description: "",
    category: "Food",
    type: "expense",
    amount: "",
  });

  useEffect(() => {
    if (transaction) {
      setForm({
        date: transaction.date,
        description: transaction.description,
        category: transaction.category,
        type: transaction.type,
        amount: String(transaction.amount),
      });
    } else {
      setForm({
        date: new Date().toISOString().split("T")[0],
        description: "",
        category: "Food",
        type: "expense",
        amount: "",
      });
    }
  }, [transaction, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      amount: parseFloat(form.amount),
    };

    if (isEdit) {
      editTransaction({ ...data, id: transaction.id });
    } else {
      addTransaction(data);
    }
    onClose();
  };

  const inputClass =
    "w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-gray-900 dark:text-gray-100";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Transaction" : "Add Transaction"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date
          </label>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <input
            type="text"
            required
            placeholder="e.g., Grocery Shopping"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className={inputClass}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={inputClass}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            required
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-dark rounded-lg transition-colors"
          >
            {isEdit ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
