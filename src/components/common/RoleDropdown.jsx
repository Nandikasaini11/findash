import { useRole } from "../../hooks/useRole";

export default function RoleDropdown() {
  const { role, setRole } = useRole();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Role
      </span>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="text-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
      >
        <option value="admin">Admin</option>
        <option value="viewer">Viewer</option>
      </select>
    </div>
  );
}
