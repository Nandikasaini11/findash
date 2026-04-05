import { createContext, useReducer, useEffect } from "react";
import mockTransactions from "../data/mockTransactions";

export const TransactionContext = createContext();

function getInitialTransactions() {
  const saved = localStorage.getItem("transactions");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return mockTransactions;
    }
  }
  return mockTransactions;
}

function transactionReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return [...state, action.payload];
    case "EDIT_TRANSACTION":
      return state.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
    case "DELETE_TRANSACTION":
      return state.filter((t) => t.id !== action.payload);
    default:
      return state;
  }
}

export function TransactionProvider({ children }) {
  const [transactions, dispatch] = useReducer(
    transactionReducer,
    null,
    getInitialTransactions
  );

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (txn) =>
    dispatch({
      type: "ADD_TRANSACTION",
      payload: { ...txn, id: `txn-${Date.now()}` },
    });

  const editTransaction = (txn) =>
    dispatch({ type: "EDIT_TRANSACTION", payload: txn });

  const deleteTransaction = (id) =>
    dispatch({ type: "DELETE_TRANSACTION", payload: id });

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, editTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
