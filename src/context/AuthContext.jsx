import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../shared/api/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data).user : null;
  });

  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("access") || null);
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refresh") || null);

  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete api.defaults.headers.Authorization;
    }
  }, [accessToken]);

  const saveAuth = (data) => {
    setUser(data.user);
    setAccessToken(data.access);
    if (data.refresh) setRefreshToken(data.refresh);

    localStorage.setItem("auth", JSON.stringify(data));
    localStorage.setItem("access", data.access);
    if (data.refresh) localStorage.setItem("refresh", data.refresh);
  };

  const clearAuth = () => {
    console.warn("⚠️ Сессия завершена — выполняется выход");
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    delete api.defaults.headers.Authorization;
  };

  useEffect(() => {
    if (!refreshToken) return;

    let isRefreshing = false;

    const refreshAccessToken = async () => {
      if (isRefreshing) return;
      isRefreshing = true;

      try {
        if (document.visibilityState === "hidden") return;

        const res = await api.post("accounts/token/refresh/", { refresh: refreshToken });
        const newAccess = res.data.access;

        setAccessToken(newAccess);
        localStorage.setItem("access", newAccess);
        api.defaults.headers.Authorization = `Bearer ${newAccess}`;
        console.log("✅ Access токен успешно обновлён");
      } catch (err) {
        console.error("❌ Ошибка при обновлении токена:", err);

        const status = err.response?.status;

        if (status === 401 || status === 403) {
          clearAuth();
        } else if (!status) {
          console.warn("⚠️ Нет соединения с сервером — токен не обновлён");
        }
      } finally {
        isRefreshing = false;
      }
    };

    refreshAccessToken();

    const interval = setInterval(refreshAccessToken, 3600000); // обновление каждый час
    return () => clearInterval(interval);
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ user, accessToken, saveAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
