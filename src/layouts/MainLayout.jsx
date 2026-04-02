import { Outlet } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Sidebar from "../components/common/Sidebar";
import MobileHeader from "../components/common/MobileHeader";

export default function MainLayout() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Sidebar />
        <MobileHeader />
        <main className="lg:ml-64 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
