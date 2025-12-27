// src/shared/api/api.js
import axios from "axios";
import { refreshAccessToken } from "./refreshAccessToken";
import { logout } from "./authService";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

// ----- REQUEST -----
api.interceptors.request.use((config) => {
  const access = localStorage.getItem("access");
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => {
    error ? p.reject(error) : p.resolve(token);
  });
  failedQueue = [];
};

// ----- RESPONSE -----
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const data = await refreshAccessToken();
        processQueue(null, data.access);

        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        logout(); // 🔥 ПОЛНЫЙ AUTO-LOGOUT
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
