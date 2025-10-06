import { createContext, useContext, useMemo } from "react";

export const AuthContext = createContext({ user: null });

export function AuthProvider({ children }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
  const user = token ? { id: "local", username: "user" } : null;
  const value = useMemo(() => ({ user }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}