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
