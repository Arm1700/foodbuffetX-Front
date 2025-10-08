/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({ user: null, accessToken: null });

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
    setAccessToken(token);
    setUser(token ? { id: "local", username: "user" } : null);
  }, []);

  const clearAuth = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access");
      }
    } catch (e) {
      console.warn("clearAuth: localStorage remove failed", e);
    }
    setAccessToken(null);
    setUser(null);
  };

  const value = { user, accessToken, clearAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}