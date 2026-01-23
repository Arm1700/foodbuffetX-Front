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

    console.warn("⚠️ Session ended — logging out");
  };

  // --- AUTO REFRESH TOKEN ---
  useEffect(() => {
    if (!refreshToken) return;

    let isRefreshing = false;
    let intervalId = null;
    let timeoutId = null;

    const refreshAccessToken = async () => {
      if (isRefreshing) return;
      isRefreshing = true;

      try {
        if (document.visibilityState === "hidden") {
          isRefreshing = false;
          return;
        }

        const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
        const res = await fetch(`${API_BASE}/api/accounts/refresh/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const newAccess = data.access;

        // Update all token storage locations
        setAccessToken(newAccess);
        localStorage.setItem("access", newAccess);
        
        // Update auth object in localStorage
        const authData = JSON.parse(localStorage.getItem("auth") || "{}");
        authData.access = newAccess;
        if (data.refresh) {
          authData.refresh = data.refresh;
          localStorage.setItem("refresh", data.refresh);
        }
        localStorage.setItem("auth", JSON.stringify(authData));
        
        // Update API default headers
        if (api && api.defaults) {
          api.defaults.headers.Authorization = `Bearer ${newAccess}`;
        }

        console.log("✅ Access token successfully refreshed");
      } catch (err) {
        console.error("❌ Token refresh error:", err);
        const status = err.status || err.response?.status;

        // Only clear auth if it's a real auth error, not a network error
        if (status === 401 || status === 403) {
          console.warn("⚠️ Refresh token expired, logging out");
          clearAuth();
        } else if (!status) {
          console.warn("⚠️ No connection to server, will retry later");
        }
      } finally {
        isRefreshing = false;
      }
    };

    // Refresh immediately on mount
    refreshAccessToken();

    // Refresh every 3.5 minutes (before 5 minute expiry, with safety margin)
    intervalId = setInterval(refreshAccessToken, 3.5 * 60 * 1000);

    // Also refresh when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && refreshToken && !isRefreshing) {
        refreshAccessToken();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refreshToken]);

  const value = { user, accessToken, saveAuth, clearAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
