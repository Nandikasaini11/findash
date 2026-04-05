import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import RoleDropdown from "./RoleDropdown";
import { useRole } from "../../hooks/useRole";

const navItems = [
  {
    to: "/",
    label: "Dashboard",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: "/transactions",
    label: "Transactions",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    to: "/insights",
    label: "Insights",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const { role } = useRole();

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 z-30 transition-colors duration-300
      bg-white dark:bg-[#0B0C10] border-r border-[#23242C]">

      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#23242C]">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-[#181921] border border-gray-200 dark:border-[#2D2E36]">
          <svg className="w-4 h-4 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        </div>
        <span className="font-semibold text-gray-900 dark:text-white tracking-tight">FinDash</span>
      </div>

      {/* Nav */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gray-100 dark:bg-[#181921] text-gray-900 dark:text-white"
                    : "text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-300"
                }`
              }
            >
              <span className="opacity-80 flex items-center justify-center">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom controls */}
      <div className="px-5 py-4 border-t border-[#23242C] space-y-4">
        <RoleDropdown />
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
