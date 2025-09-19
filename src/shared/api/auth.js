import axios from "./axiosInstance";
import { refreshAccessToken } from "./refreshAccessToken";

// -------- REGISTER --------
export async function register(phone, password, password_confirm) {
  try {
    const res = await axios.post(
      "register/",
      { phone, password, password_confirm },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// -------- LOGIN --------
export async function login(phone, password) {
  try {
    const res = await axios.post(
      "login/",
      { phone, password },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// -------- LOGOUT --------
export async function logout(refresh) {
  try {
    const res = await axios.post(
      "logout/",
      { refresh },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// -------- ADD ADDRESS --------
export async function addAddress(address) {
  try {
    let auth = JSON.parse(localStorage.getItem("auth") || "{}");

    // если нет access, пробуем обновить
    if (!auth.access) {
      const tokens = await refreshAccessToken();
      auth.access = tokens.access;
    }

    const res = await axios.post(
      "addresses/",
      { address },
      {
        headers: { Authorization: `Bearer ${auth.access}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// -------- GET ADDRESSES --------
export async function getAddresses() {
  try {
    let auth = JSON.parse(localStorage.getItem("auth") || "{}");

    if (!auth.access) {
      const tokens = await refreshAccessToken();
      auth.access = tokens.access;
    }

    const res = await axios.get("addresses/", {
      headers: { Authorization: `Bearer ${auth.access}` },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// -------- DELETE ADDRESS --------
export async function deleteAddress(id) {
  try {
    let auth = JSON.parse(localStorage.getItem("auth") || "{}");

    if (!auth.access) {
      const tokens = await refreshAccessToken();
      auth.access = tokens.access;
    }

    const res = await axios.delete(`addresses/${id}/`, {
      headers: { Authorization: `Bearer ${auth.access}` },
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}



// -------- GET MEALS --------
export async function getMeals() {
  try {
    let auth = JSON.parse(localStorage.getItem("auth") || "{}");
    if (!auth.access) {
      const tokens = await refreshAccessToken();
      auth.access = tokens.access;
    }

    const res = await axios.get("meals/", {
      headers: { Authorization: `Bearer ${auth.access}` },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// -------- GET FAVORITES --------
export async function getFavorites() {
  try {
    let auth = JSON.parse(localStorage.getItem("auth") || "{}");
    if (!auth.access) {
      const tokens = await refreshAccessToken();
      auth.access = tokens.access;
    }

    const res = await axios.get("favorites/", {
      headers: { Authorization: `Bearer ${auth.access}` },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
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

    const res = await axios.post(
      `toggle-favorite/${mealId}/`,
      {},
      {
        headers: { Authorization: `Bearer ${auth.access}` },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

