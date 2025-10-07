import axios from "axios";

export async function refreshAccessToken() {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const refresh = auth?.refresh;

  if (!refresh) {
    throw new Error("Нет refresh токена");
  }

  const response = await axios.post(
    "http://localhost:8000/api/accounts/refresh/",
    { refresh },
    { withCredentials: true }
  );

  const newAuth = { ...auth, access: response.data.access };
  localStorage.setItem("auth", JSON.stringify(newAuth));

  return response.data;
}
