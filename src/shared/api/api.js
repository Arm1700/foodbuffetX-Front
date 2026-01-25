import axios from "axios";
import { refreshAccessToken } from "./refreshAccessToken";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: `${API_BASE}/api/`,
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const authData = JSON.parse(localStorage.getItem("auth") || "{}");
  if (authData.access) config.headers.Authorization = `Bearer ${authData.access}`;
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => error ? p.reject(error) : p.resolve(token));
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;
      try {
        const data = await refreshAccessToken();
        api.defaults.headers.common.Authorization = `Bearer ${data.access}`;
        processQueue(null, data.access);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        // Only clear auth if refresh token is invalid
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("auth");
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
