<<<<<<< HEAD
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useMemo, useState } from "react";

export const MealDataContext = createContext({
  meals: [],
  loading: true,
  error: "",
  toggleFavorite: () => {},
});

export function MealDataProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
    const token = localStorage.getItem("access");

    const stripHtml = (html) => {
      if (typeof html !== "string") return "";
      return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    };

    const fetchWithFallback = async () => {
      const endpoints = ["/api/products/", "/api/meals/"];
      for (const ep of endpoints) {
        try {
          const res = await fetch(`${API_BASE}${ep}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          });
          if (!res.ok) continue;
          const data = await res.json();
          const items = Array.isArray(data) ? data : data?.results || [];
          if (items.length) {
            const normalized = items.map((it) => ({
              id: it.id,
              name: stripHtml(it.name || it.title || ""),
              description: stripHtml(it.description || it.text || ""),
              price: typeof it.price === "number" ? it.price : Number(it.price ?? 0),
              img: it.img || it.image || it.photo || it.image_url || "",
              is_favorited: !!it.is_favorited,
            }));
            setMeals(normalized);
            return;
          }
        } catch {
          // try next endpoint
        }
      }
    };

    fetchWithFallback()
      .catch((err) => setError(err?.message || "Fetch error"))
      .finally(() => setLoading(false));
  }, []);

  const toggleFavorite = (id) => {
    setMeals((prev) => prev.map((m) => (m.id === id ? { ...m, is_favorited: !m.is_favorited } : m)));
  };

  const value = useMemo(() => ({ meals, loading, error, toggleFavorite }), [meals, loading, error]);

  return <MealDataContext.Provider value={value}>{children}</MealDataContext.Provider>;
}
=======
import React, { createContext, useReducer, useEffect } from "react";
import api from "../shared/api/api";
import { useAuth } from "./AuthContext";

export const MealDataContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MEALS":
      return { ...state, meals: action.payload, loading: false, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        meals: state.meals.map(m =>
          m.id === action.payload ? { ...m, is_favorited: !m.is_favorited } : m
        ),
      };
    default:
      return state;
  }
};

const MealDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { meals: [], loading: true, error: null });
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) return;

    let mounted = true;

    const fetchMeals = async () => {
      try {
        const res = await api.get("meals/"); // <-- путь с бэка
        const data = Array.isArray(res.data) ? res.data : res.data?.results ?? [];
        if (mounted) dispatch({ type: "SET_MEALS", payload: data });
      } catch (err) {
        console.error("Fetch meals error:", err);
        if (mounted) dispatch({ type: "SET_ERROR", payload: "Failed to load meals" });
      }
    };

    fetchMeals();
    return () => { mounted = false; };
  }, [accessToken]);

  const toggleFavorite = async (mealId) => {
    const meal = state.meals.find(m => m.id === mealId);
    if (!meal || !accessToken) return;

    dispatch({ type: "TOGGLE_FAVORITE", payload: mealId });

    try {
      if (!meal.is_favorited) {
        await api.post(`meals/${mealId}/toggle-favorite/`);
      } else {
        await api.delete(`meals/${mealId}/toggle-favorite/`);
      }
    } catch (err) {
      console.error("Ошибка при лайке:", err);
      dispatch({ type: "TOGGLE_FAVORITE", payload: mealId }); // откат UI
    }
  };

  return (
    <MealDataContext.Provider value={{ meals: state.meals, loading: state.loading, error: state.error, toggleFavorite }}>
      {children}
    </MealDataContext.Provider>
  );
};

export default MealDataProvider;
>>>>>>> 36b51af2920f9ff311faaa832b56c4b64e09b8fb
