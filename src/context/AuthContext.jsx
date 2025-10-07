/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from "react";

export const AuthContext = createContext({ user: null });

export function AuthProvider({ children }) {
  const value = useMemo(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
    const user = token ? { id: "local", username: "user" } : null;
    return { user };
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}