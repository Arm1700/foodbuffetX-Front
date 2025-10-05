// refreshAccessToken.js
import axios from "./axiosInstance";

export async function refreshAccessToken() {
  // Отправляем POST /refresh/ с куки, body может быть пустым
  const response = await axios.post("refresh/", {}, { withCredentials: true });

  // Обновляем access в localStorage
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const newAuth = { ...auth, access: response.data.access };
  localStorage.setItem("auth", JSON.stringify(newAuth));

  return response.data;
}
