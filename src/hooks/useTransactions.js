import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
export const useTransactions = () => useContext(TransactionContext);
