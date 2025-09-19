import { useState, useEffect } from "react";
import axiosMeals from "../shared/api/axiosMeals"; // твой axios с интерсептором

export function useMeals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosMeals.get("/"); // подставляется токен автоматически
        setMeals(response.data); // список блюд
      } catch (err) {
        console.error("Failed to fetch meals:", err.response?.data || err.message);
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return { meals, loading, error };
}
