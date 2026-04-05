# FinDash — Finance Dashboard

A clean, interactive finance dashboard built with React for tracking and understanding personal financial activity. Designed as a frontend assignment demonstrating UI architecture, state management, role-based access control, and responsive design.

---

## Approach

This dashboard was built with a component-driven architecture where each UI element has a single responsibility. The app is split into three pages — Dashboard, Transactions, and Insights — each consuming shared state from React Context providers.

State is managed through four independent contexts (Theme, Role, Transactions, Filters) keeping concerns cleanly separated. Transactions use `useReducer` for predictable ADD, EDIT, and DELETE operations. All critical state persists to localStorage so the app feels continuous across page refreshes.

The role-based UI is purely frontend — switching between Admin and Viewer instantly shows or hides controls without any routing changes. Mock data covers 6 months of realistic transactions across 8 categories to make charts and insights meaningful.

---

## Features

### ✅ Core Requirements
- **Dashboard Overview** — Summary cards with trend indicators, balance trend chart, spending donut chart, and top spending categories
- **Transactions** — Searchable, filterable, sortable transaction table with income/expense summary
- **Insights** — 6 insight cards, monthly income vs expense chart, and smart observations
- **Role-Based UI** — Admin vs Viewer with controlled access
- **State Management** — React Context with useReducer
- **Responsive Design** — Mobile, tablet, and desktop layouts
- **Empty States** — Graceful handling on all 3 pages

### 🌟 Optional Enhancements
- **Dark / Light Mode** — Toggle with localStorage persistence
- **Data Persistence** — Transactions, role and theme saved to localStorage
- **Export (CSV / JSON)** — Export filtered transactions from the table
- **Delete Transaction** — Admin only, with confirmation

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI library |
| Vite | 8 | Build tool / dev server |
| React Router | v7 | Client-side routing |
| Tailwind CSS | 3 | Utility-first styling |
| Recharts | 3 | Data visualization |
| ESLint | 9 | Code linting |

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
# Clone the repository
git clone https://github.com/Nandikasaini11/findash.git
cd findash

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app runs at `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

---

## Project Structure
src/
├── components/
│   ├── common/       # Card, Modal, Badge, EmptyState, Sidebar
│   ├── dashboard/    # SummaryCard, BalanceTrendChart, SpendingPieChart
│   ├── transactions/ # TransactionTable, Filters, Modal, ExportDropdown
│   └── insights/     # InsightCard, IncomeExpenseChart, SmartObservations
├── contexts/         # ThemeContext, RoleContext, TransactionContext, FilterContext
├── hooks/            # useTheme, useRole, useTransactions, useFilters
├── layouts/          # MainLayout
├── pages/            # DashboardPage, TransactionsPage, InsightsPage
├── data/             # mockTransactions.js
└── utils/            # formatCurrency, dateUtils, insightCalculations

---

## State Management

Four independent React Context providers, each with a single responsibility:

| Context | State | Persistence |
|---|---|---|
| `ThemeContext` | light / dark mode | localStorage |
| `RoleContext` | admin / viewer | localStorage |
| `TransactionContext` | transactions via useReducer | localStorage |
| `FilterContext` | search, filters, sort | in-memory |

- `TransactionContext` uses `useReducer` for predictable ADD, EDIT, DELETE transitions
- On mount, transactions are read from localStorage and fall back to mock data if empty
- Every state change syncs back to localStorage via `useEffect`

---

## Role-Based UI

| Feature | Admin | Viewer |
|---|---|---|
| View all data | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Delete transaction | ✅ | ❌ |
| Export data | ✅ | ✅ |

Role is switched via a dropdown in the sidebar and persists across navigation and page refresh via localStorage. This is a frontend-only simulation — no route protection or authentication is implemented.

---

## Mock Data

30 realistic transactions spanning October 2025 to March 2026 across 8 categories: Food, Rent, Salary, Transport, Entertainment, Healthcare, Shopping, Utilities.
