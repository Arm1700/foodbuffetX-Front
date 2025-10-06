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
        } catch (_) {
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