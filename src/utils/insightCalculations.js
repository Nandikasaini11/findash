import { getMonthKey } from "./dateUtils";

export function getHighestSpendingCategory(transactions) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const byCategory = {};
  expenses.forEach((t) => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
  });

  let maxCat = null;
  let maxAmount = 0;
  Object.entries(byCategory).forEach(([cat, amount]) => {
    if (amount > maxAmount) {
      maxCat = cat;
      maxAmount = amount;
    }
  });

  return { category: maxCat, amount: maxAmount };
}

export function getMonthlyData(transactions) {
  const months = {};
  transactions.forEach((t) => {
    const key = getMonthKey(t.date);
    if (!months[key]) months[key] = { income: 0, expense: 0 };
    if (t.type === "income") months[key].income += t.amount;
    else months[key].expense += t.amount;
  });

  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, data]) => ({
      month: key,
      label: new Date(key + "-01T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      }),
      ...data,
    }));
}

export function getMonthOverMonth(transactions) {
  const monthlyData = getMonthlyData(transactions);
  if (monthlyData.length < 2) return null;

  const current = monthlyData[monthlyData.length - 1];
  const previous = monthlyData[monthlyData.length - 2];

  const currentSpending = current.expense;
  const previousSpending = previous.expense;

  if (previousSpending === 0) return null;
  const change = ((currentSpending - previousSpending) / previousSpending) * 100;

  return {
    currentMonth: current.label,
    previousMonth: previous.label,
    change: change.toFixed(1),
    currentSpending,
    previousSpending,
  };
}

export function getNetSavingsThisMonth(transactions) {
  const now = new Date();
  const currentKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const monthTxns = transactions.filter((t) => getMonthKey(t.date) === currentKey);
  const income = monthTxns.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = monthTxns.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  // If no data for current month, use the latest month with data
  if (monthTxns.length === 0) {
    const monthlyData = getMonthlyData(transactions);
    if (monthlyData.length === 0) return { savings: 0, label: "N/A" };
    const latest = monthlyData[monthlyData.length - 1];
    return { savings: latest.income - latest.expense, label: latest.label };
  }
  const label = new Date(currentKey + "-01T00:00:00").toLocaleDateString("en-US", { month: "short", year: "2-digit" });
  return { savings: income - expense, label };
}

export function getMostActiveMonth(transactions) {
  const counts = {};
  transactions.forEach((t) => {
    const key = getMonthKey(t.date);
    counts[key] = (counts[key] || 0) + 1;
  });
  let maxKey = null;
  let maxCount = 0;
  Object.entries(counts).forEach(([key, count]) => {
    if (count > maxCount) { maxKey = key; maxCount = count; }
  });
  if (!maxKey) return { label: "N/A", count: 0 };
  const label = new Date(maxKey + "-01T00:00:00").toLocaleDateString("en-US", { month: "short", year: "2-digit" });
  return { label, count: maxCount };
}

export function getAvgMonthlyIncome(transactions) {
  const monthlyData = getMonthlyData(transactions);
  if (monthlyData.length === 0) return 0;
  const total = monthlyData.reduce((s, m) => s + m.income, 0);
  return total / monthlyData.length;
}

export function getAvgMonthlyExpense(transactions) {
  const monthlyData = getMonthlyData(transactions);
  if (monthlyData.length === 0) return 0;
  const total = monthlyData.reduce((s, m) => s + m.expense, 0);
  return total / monthlyData.length;
}

export function getSmartObservations(transactions) {
  const observations = [];
  const expenses = transactions.filter((t) => t.type === "expense");
  const incomes = transactions.filter((t) => t.type === "income");

  // Average transaction size
  if (expenses.length > 0) {
    const avgExpense = expenses.reduce((s, t) => s + t.amount, 0) / expenses.length;
    observations.push(
      `Your average expense is $${avgExpense.toFixed(2)} per transaction.`
    );
  }

  // Income vs expense ratio
  const totalIncome = incomes.reduce((s, t) => s + t.amount, 0);
  const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
  const savingsRate = ((totalIncome - totalExpense) / totalIncome) * 100;
  if (totalIncome > 0) {
    observations.push(
      `You're saving ${savingsRate.toFixed(1)}% of your income. ${
        savingsRate >= 20 ? "Great job!" : "Try to aim for at least 20%."
      }`
    );
  }

  // Most frequent category
  const catCount = {};
  expenses.forEach((t) => {
    catCount[t.category] = (catCount[t.category] || 0) + 1;
  });
  const mostFrequent = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0];
  if (mostFrequent) {
    observations.push(
      `${mostFrequent[0]} is your most frequent expense category with ${mostFrequent[1]} transactions.`
    );
  }

  return observations;
}
