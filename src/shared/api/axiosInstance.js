import axios from "axios";
import { refreshAccessToken } from "./refreshAccessToken";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/accounts/",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
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

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return instance(originalRequest);
        });
      }

      isRefreshing = true;
      try {
        const data = await refreshAccessToken();
        instance.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
        processQueue(null, data.access);
        isRefreshing = false;

        originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
        return instance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        localStorage.removeItem("auth");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
