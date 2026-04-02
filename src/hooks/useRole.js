import { useContext } from "react";
import { RoleContext } from "../contexts/RoleContext";
export const useRole = () => useContext(RoleContext);
