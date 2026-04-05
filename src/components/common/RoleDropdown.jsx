import { useRole } from "../../hooks/useRole";

export default function RoleDropdown() {
  const { role, setRole } = useRole();

  return (
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="w-full text-sm bg-gray-100 dark:bg-[#181921] border border-gray-200 dark:border-[#23242C] rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500 cursor-pointer transition-colors"
    >
      <option value="admin">Admin</option>
      <option value="viewer">Viewer</option>
    </select>
  );
}

