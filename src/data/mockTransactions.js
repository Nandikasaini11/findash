const mockTransactions = [
  // October 2025
  { id: "txn-001", date: "2025-10-01", description: "Monthly Salary", category: "Salary", type: "income", amount: 5200.00 },
  { id: "txn-002", date: "2025-10-03", description: "Apartment Rent", category: "Rent", type: "expense", amount: 1500.00 },
  { id: "txn-003", date: "2025-10-07", description: "Grocery Shopping", category: "Food", type: "expense", amount: 142.30 },
  { id: "txn-004", date: "2025-10-12", description: "Uber Rides", category: "Transport", type: "expense", amount: 45.00 },
  { id: "txn-005", date: "2025-10-18", description: "Netflix & Spotify", category: "Entertainment", type: "expense", amount: 28.99 },

  // November 2025
  { id: "txn-006", date: "2025-11-01", description: "Monthly Salary", category: "Salary", type: "income", amount: 5200.00 },
  { id: "txn-007", date: "2025-11-03", description: "Apartment Rent", category: "Rent", type: "expense", amount: 1500.00 },
  { id: "txn-008", date: "2025-11-05", description: "Dentist Checkup", category: "Healthcare", type: "expense", amount: 250.00 },
  { id: "txn-009", date: "2025-11-10", description: "Winter Jacket", category: "Shopping", type: "expense", amount: 189.99 },
  { id: "txn-010", date: "2025-11-20", description: "Electricity Bill", category: "Utilities", type: "expense", amount: 95.40 },

  // December 2025
  { id: "txn-011", date: "2025-12-01", description: "Monthly Salary", category: "Salary", type: "income", amount: 5200.00 },
  { id: "txn-012", date: "2025-12-01", description: "Year-End Bonus", category: "Salary", type: "income", amount: 2600.00 },
  { id: "txn-013", date: "2025-12-03", description: "Apartment Rent", category: "Rent", type: "expense", amount: 1500.00 },
  { id: "txn-014", date: "2025-12-15", description: "Holiday Gifts", category: "Shopping", type: "expense", amount: 340.00 },
  { id: "txn-015", date: "2025-12-22", description: "Restaurant Dinner", category: "Food", type: "expense", amount: 87.50 },
  { id: "txn-016", date: "2025-12-28", description: "Movie Tickets", category: "Entertainment", type: "expense", amount: 36.00 },

  // January 2026
  { id: "txn-017", date: "2026-01-01", description: "Monthly Salary", category: "Salary", type: "income", amount: 5400.00 },
  { id: "txn-018", date: "2026-01-03", description: "Apartment Rent", category: "Rent", type: "expense", amount: 1500.00 },
  { id: "txn-019", date: "2026-01-08", description: "Gym Membership", category: "Healthcare", type: "expense", amount: 55.00 },
  { id: "txn-020", date: "2026-01-14", description: "Weekly Groceries", category: "Food", type: "expense", amount: 163.20 },

  // February 2026
  { id: "txn-021", date: "2026-02-01", description: "Monthly Salary", category: "Salary", type: "income", amount: 5400.00 },
  { id: "txn-022", date: "2026-02-03", description: "Apartment Rent", category: "Rent", type: "expense", amount: 1500.00 },
  { id: "txn-023", date: "2026-02-10", description: "Internet & Phone", category: "Utilities", type: "expense", amount: 120.00 },
  { id: "txn-024", date: "2026-02-14", description: "Valentine Dinner", category: "Food", type: "expense", amount: 95.00 },
  { id: "txn-025", date: "2026-02-20", description: "Bus Pass", category: "Transport", type: "expense", amount: 65.00 },

  // March 2026
  { id: "txn-026", date: "2026-03-01", description: "Monthly Salary", category: "Salary", type: "income", amount: 5400.00 },
  { id: "txn-027", date: "2026-03-03", description: "Apartment Rent", category: "Rent", type: "expense", amount: 1500.00 },
  { id: "txn-028", date: "2026-03-08", description: "Concert Tickets", category: "Entertainment", type: "expense", amount: 120.00 },
  { id: "txn-029", date: "2026-03-15", description: "New Sneakers", category: "Shopping", type: "expense", amount: 134.99 },
  { id: "txn-030", date: "2026-03-22", description: "Freelance Payment", category: "Salary", type: "income", amount: 800.00 },
];

export const CATEGORIES = [
  "Food", "Rent", "Salary", "Transport", "Entertainment", "Healthcare", "Shopping", "Utilities"
];

export const CATEGORY_COLORS = {
  Food: "#f97316",
  Rent: "#8b5cf6",
  Salary: "#22c55e",
  Transport: "#3b82f6",
  Entertainment: "#ec4899",
  Healthcare: "#ef4444",
  Shopping: "#f59e0b",
  Utilities: "#06b6d4",
};

export default mockTransactions;
