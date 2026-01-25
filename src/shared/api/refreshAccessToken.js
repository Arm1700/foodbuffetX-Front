import axios from "axios";

export async function refreshAccessToken() {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const refresh = auth?.refresh || localStorage.getItem("refresh");

  if (!refresh) {
    throw new Error("No refresh token");
  }

  const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
  const response = await axios.post(
    `${API_BASE}/api/accounts/refresh/`,
    { refresh },
    { withCredentials: true }
  );

  const newAccess = response.data.access;
  const newAuth = { ...auth, access: newAccess };
  
  // Update all token storage locations
  localStorage.setItem("auth", JSON.stringify(newAuth));
  localStorage.setItem("access", newAccess);

  return { access: newAccess };
}
