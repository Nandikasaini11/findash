import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import RoleDropdown from "./RoleDropdown";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/transactions", label: "Transactions" },
  { to: "/insights", label: "Insights" },
];

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">FinDash</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Slide-out menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 z-50 shadow-xl animate-slideIn">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800">
              <RoleDropdown />
            </div>
          </div>
        </>
      )}

      {/* Spacer for fixed header */}
      <div className="h-14" />
    </div>
  );
}
