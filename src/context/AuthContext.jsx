<<<<<<< HEAD
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
=======
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data).user : null;
  });
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("access") || null;
  });

  const saveAuth = (data) => {
    setUser(data.user);
    setAccessToken(data.access);
    localStorage.setItem("auth", JSON.stringify(data));
    localStorage.setItem("access", data.access);
  };

  const clearAuth = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("access");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, saveAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
>>>>>>> 36b51af2920f9ff311faaa832b56c4b64e09b8fb
