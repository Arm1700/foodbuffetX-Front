import axios from "axios";

export async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) {
    throw new Error("Нет refresh токена");
  }

  const response = await axios.post(
    "http://localhost:8000/api/accounts/token/refresh/",
    { refresh },
    { withCredentials: true }
  );

  const newAccess = response.data.access;

  localStorage.setItem("access", newAccess);

  return { access: newAccess };
}
