import { Outlet } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Sidebar from "../components/common/Sidebar";
import MobileHeader from "../components/common/MobileHeader";

export default function MainLayout() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-[#F5F6F8] dark:bg-[#0B0C10] text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Sidebar />
        <MobileHeader />
        <main className="lg:ml-64 p-5 md:p-7 lg:p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
