import React, { createContext, useReducer, useEffect } from "react";
import { HomeArray } from "../pages/HomePage/HomeArray";

export const MealDataContext = createContext();

const getMealsForUser = (userId) => {
  const saved = localStorage.getItem(`likes_user_${userId}`);
  if (saved) {
    const likedIds = JSON.parse(saved);
    return HomeArray.map((meal) => ({
      ...meal,
      is_favorited: likedIds.includes(meal.id),
    }));
  }
  return HomeArray;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MEALS":
      return { ...state, meals: action.payload };
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

const MealDataProvider = ({ children, userId }) => {
  const [state, dispatch] = useReducer(reducer, { meals: getMealsForUser(userId) });

  // Сбрасываем лайки при смене пользователя
  useEffect(() => {
    dispatch({ type: "SET_MEALS", payload: getMealsForUser(userId) });
  }, [userId]);

  const toggleFavorite = (mealId) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: mealId });

    const likedMeals = state.meals
      .map((m) => (m.id === mealId ? { ...m, is_favorited: !m.is_favorited } : m))
      .filter((m) => m.is_favorited)
      .map((m) => m.id);

    localStorage.setItem(`likes_user_${userId}`, JSON.stringify(likedMeals));
  };

  return (
    <MealDataContext.Provider value={{ meals: state.meals, toggleFavorite }}>
      {children}
    </MealDataContext.Provider>
  );
};

export default MealDataProvider;
