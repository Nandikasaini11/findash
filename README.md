# FinDash — Finance Dashboard

A clean, interactive finance dashboard built with React for tracking 
and understanding personal financial activity. Designed as a frontend 
assignment demonstrating UI architecture, state management, role-based 
access control, and responsive design.

## Live Features

### ✅ Core Requirements
- **Dashboard Overview** — Summary cards, balance trend chart, spending donut chart
- **Transactions** — Searchable, filterable, sortable transaction table
- **Insights** — Spending analysis, monthly comparison, smart observations
- **Role-Based UI** — Admin vs Viewer with controlled access
- **State Management** — React Context with useReducer
- **Responsive Design** — Mobile, tablet, desktop layouts
- **Empty States** — Graceful handling on all 3 pages

### 🌟 Optional Enhancements Implemented
- **Dark / Light Mode** — Toggle with localStorage persistence
- **Data Persistence** — Transactions and role saved to localStorage
- **Export (CSV / JSON)** — Export filtered transactions from the table
- **Animations** — Modal transitions, card hover effects, sidebar slide

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool and dev server |
| Tailwind CSS 3 | Utility-first styling |
| Recharts | Charts (Line, Donut, Bar) |
| React Router DOM | Client-side routing |
| React Context API | Global state management |

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd dashboard

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

## Project Structure
```
src/
├── components/
│   ├── common/          # Card, Modal, Badge, EmptyState, Sidebar, etc.
│   ├── dashboard/       # SummaryCard, BalanceTrendChart, SpendingPieChart
│   ├── transactions/    # TransactionTable, Filters, Row, Modal, ExportDropdown
│   └── insights/        # InsightCard, IncomeExpenseChart, SmartObservations
├── contexts/            # ThemeContext, RoleContext, TransactionContext, FilterContext
├── hooks/               # useTheme, useRole, useTransactions, useFilters
├── layouts/             # MainLayout (sidebar + mobile header)
├── pages/               # DashboardPage, TransactionsPage, InsightsPage
├── data/                # mockTransactions.js, category colors
└── utils/               # formatCurrency, dateUtils, insightCalculations
```

## State Management Approach

Four independent React Context providers, each with a single responsibility:

| Context | State | Persistence |
|---|---|---|
| `ThemeContext` | light / dark mode | localStorage |
| `RoleContext` | admin / viewer role | localStorage |
| `TransactionContext` | transactions array via useReducer | localStorage |
| `FilterContext` | search, type filter, category, sort | in-memory |

- `TransactionContext` uses `useReducer` for predictable state transitions (ADD, EDIT, DELETE)
- On mount, transactions are read from localStorage and fall back to mock data if empty
- Every state change syncs back to localStorage via `useEffect`

## Role-Based UI

| Feature | Admin | Viewer |
|---|---|---|
| View transactions | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Export data | ✅ | ✅ |
| View insights | ✅ | ✅ |

Role is switched via a dropdown in the sidebar and persists across 
navigation and page refresh via localStorage. This is a frontend-only 
simulation — no route protection or authentication is implemented.

## Mock Data

30 realistic transactions spanning October 2025 to March 2026 across 
8 categories: Food, Rent, Salary, Transport, Entertainment, Healthcare, 
Shopping, Utilities.

## Design Decisions

- Amounts stored as positive numbers — the `type` field (income/expense) 
  determines sign
- Charts consume ThemeContext to update colors for dark/light mode
- Sidebar collapses at the `lg` breakpoint — replaced by hamburger menu 
  with a slide-in drawer on mobile
- Transaction table scrolls horizontally on narrow screens
