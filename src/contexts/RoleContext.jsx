import { createContext, useState, useEffect } from "react";

export const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "admin";
  });

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}
