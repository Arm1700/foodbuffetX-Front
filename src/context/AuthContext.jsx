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
