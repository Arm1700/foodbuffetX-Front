/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../shared/api/api";

export const AuthContext = createContext({
  user: null,
  accessToken: null,
  clearAuth: () => {},
  saveAuth: () => {},
});

export function AuthProvider({ children }) {
  // --- STATES ---
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data).user : null;
  });

  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("access") || null;
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    return localStorage.getItem("refresh") || null;
  });

  // --- APPLY ACCESS TOKEN TO API ---
  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete api.defaults.headers.Authorization;
    }
  }, [accessToken]);

  // --- SAVE AUTH ---
  const saveAuth = (data) => {
    setUser(data.user);
    setAccessToken(data.access);
    if (data.refresh) setRefreshToken(data.refresh);

    localStorage.setItem("auth", JSON.stringify(data));
    localStorage.setItem("access", data.access);
    if (data.refresh) localStorage.setItem("refresh", data.refresh);
  };

  // --- CLEAR AUTH ---
  const clearAuth = () => {
    try {
      localStorage.removeItem("auth");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    } catch (e) {
      console.warn("clearAuth: localStorage error", e);
    }

    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    delete api.defaults.headers.Authorization;

    console.warn("⚠️ Сессия завершена — выполняется выход");
  };

  // --- AUTO REFRESH TOKEN ---
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
        console.error("❌ Ошибка обновления токена:", err);

        const status = err.response?.status;

        if (status === 401 || status === 403) clearAuth();
        else if (!status) console.warn("⚠️ Нет соединения с сервером");
      } finally {
        isRefreshing = false;
      }
    };

    refreshAccessToken();
    const interval = setInterval(refreshAccessToken, 3600000);

    return () => clearInterval(interval);
  }, [refreshToken]);

  // --- CONTEXT VALUE ---
  const value = { user, accessToken, saveAuth, clearAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
