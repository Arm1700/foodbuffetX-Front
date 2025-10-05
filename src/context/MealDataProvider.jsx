import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

export const MealDataContext = createContext();

const API_BASE = "http://127.0.0.1:8000";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MEALS":
      return { ...state, meals: action.payload, loading: false, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        meals: state.meals.map((meal) =>
          meal.id === action.payload
            ? { ...meal, is_favorited: !meal.is_favorited }
            : meal
        ),
      };
    default:
      return state;
  }
};

const MealDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    meals: [],
    loading: true,
    error: null,
  });

  const { accessToken } = useAuth();

  // Загрузка meals
  useEffect(() => {
    if (!accessToken) return; // не делаем запрос, если токена нет

    let mounted = true;

    const fetchMeals = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/meals/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = Array.isArray(res.data) ? res.data : res.data?.results ?? [];
        if (mounted) dispatch({ type: "SET_MEALS", payload: data });
      } catch (err) {
        console.error("Fetch meals error:", err);
        if (mounted) dispatch({ type: "SET_ERROR", payload: "Failed to load meals" });
      }
    };

    fetchMeals();
    return () => { mounted = false };
  }, [accessToken]);

  // Лайки
  const toggleFavorite = async (mealId) => {
    const meal = state.meals.find((m) => m.id === mealId);
    if (!meal || !accessToken) return;

    dispatch({ type: "TOGGLE_FAVORITE", payload: mealId });

    try {
      if (!meal.is_favorited) {
        await axios.post(
          `${API_BASE}/api/meals/${mealId}/favorite/`,
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
      } else {
        await axios.delete(`${API_BASE}/api/meals/${mealId}/favorite/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
    } catch (err) {
      console.error("Ошибка при лайке:", err);
      dispatch({ type: "TOGGLE_FAVORITE", payload: mealId }); // откат UI
    }
  };

  return (
    <MealDataContext.Provider
      value={{
        meals: state.meals,
        loading: state.loading,
        error: state.error,
        toggleFavorite,
      }}
    >
      {children}
    </MealDataContext.Provider>
  );
};

export default MealDataProvider;
