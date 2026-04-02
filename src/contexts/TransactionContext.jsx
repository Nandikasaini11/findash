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

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, editTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
