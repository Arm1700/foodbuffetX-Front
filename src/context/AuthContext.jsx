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
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data).user : null;
  });

  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("access") || null
  );

  const [refreshToken, setRefreshToken] = useState(
    () => localStorage.getItem("refresh") || null
  );

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

    console.warn("⚠️ Session ended — logging out");
  };

  // --- AUTO REFRESH TOKEN ---
  useEffect(() => {
    if (!refreshToken) return;

    let isRefreshing = false;
    let intervalId = null;

    const refreshAccessToken = async () => {
      if (isRefreshing) return;
      isRefreshing = true;

      try {
        if (document.visibilityState === "hidden") return;

        const API_BASE =
          import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

        const res = await fetch(`${API_BASE}/api/accounts/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!res.ok) throw new Error(res.status);

        const data = await res.json();
        const newAccess = data.access;

        setAccessToken(newAccess);
        localStorage.setItem("access", newAccess);

        const authData = JSON.parse(localStorage.getItem("auth") || "{}");
        authData.access = newAccess;
        localStorage.setItem("auth", JSON.stringify(authData));

        api.defaults.headers.Authorization = `Bearer ${newAccess}`;
        console.log("✅ Access token refreshed");
      } catch (err) {
        const status = err?.message;
        if (status === "401" || status === "403") clearAuth();
        else console.warn("⚠️ Token refresh skipped");
      } finally {
        isRefreshing = false;
      }
    };

    refreshAccessToken();
    intervalId = setInterval(refreshAccessToken, 3.5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ user, accessToken, saveAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
