import axiosInstance from "./axiosInstance";
import { refreshAccessToken } from "./refreshAccessToken";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

// -------- REGISTER --------
export async function register(email, first_name, last_name, password, password_confirm) {
  try {
    const res = await axiosInstance.post(
      "register/",
      { email, first_name, last_name, password, password_confirm }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// -------- LOGIN --------
export async function login(email, password) {
  try {
    const res = await axiosInstance.post(
      "login/",
      { email, password }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// -------- VERIFY EMAIL --------
export async function verifyEmail(email, code, password) {
  try {
    const res = await axiosInstance.post(
      "verify-email/",
      { email, code, password }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// -------- LOGOUT --------
export async function logout(refresh) {
  try {
    const res = await axiosInstance.post(
      "logout/",
      { refresh }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// -------- ADD ADDRESS --------
export async function addAddress(address) {
  try {
    const res = await axiosInstance.post(
      "addresses/",
      { address }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// -------- GET ADDRESSES --------
export async function getAddresses() {
  try {
    const res = await axiosInstance.get("addresses/");
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// -------- DELETE ADDRESS --------
export async function deleteAddress(id) {
  try {
    const res = await axiosInstance.delete(`addresses/${id}/`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// -------- GET MEALS --------
export async function getMeals() {
  try {
    const res = await axiosInstance.get("meals/");
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// -------- GET FAVORITES --------
export async function getFavorites() {
  try {
    // Favorites endpoint is under /api/favorites/, not /api/accounts/favorites/
    const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
    let auth = JSON.parse(localStorage.getItem("auth") || "{}");
    if (!auth.access) {
      const tokens = await refreshAccessToken();
      auth.access = tokens.access;
    }

    const res = await fetch(`${API_BASE}/api/favorites/`, {
      headers: {
        Authorization: `Bearer ${auth.access}`,
        "Content-Type": "application/json"
      },
      credentials: "include",
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (err) {
    throw err;
  }
}

// -------- TOGGLE FAVORITE --------
export async function toggleFavorite(mealId) {
  try {
    let auth = JSON.parse(localStorage.getItem("auth") || "{}");
    if (!auth.access) {
      const tokens = await refreshAccessToken();
      auth.access = tokens.access;
    }

    const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
    const res = await fetch(
      `${API_BASE}/api/toggle-favorite/${mealId}/`,
      {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${auth.access}`,
          "Content-Type": "application/json"
        },
        credentials: "include",
      }
    );
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (err) {
    throw err;
  }
}
