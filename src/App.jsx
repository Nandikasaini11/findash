import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { RoleProvider } from "./contexts/RoleContext";
import { TransactionProvider } from "./contexts/TransactionContext";
import { FilterProvider } from "./contexts/FilterContext";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import InsightsPage from "./pages/InsightsPage";

function App() {
  return (
    <ThemeProvider>
      <RoleProvider>
        <TransactionProvider>
          <FilterProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/transactions" element={<TransactionsPage />} />
                  <Route path="/insights" element={<InsightsPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </FilterProvider>
        </TransactionProvider>
      </RoleProvider>
    </ThemeProvider>
  );
}

export default App;
