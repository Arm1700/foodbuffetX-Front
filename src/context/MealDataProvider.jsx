/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useMemo, useState, useCallback } from "react";
import { getFavorites } from "../shared/api/auth";

export const MealDataContext = createContext({
  meals: [],
  loading: true,
  error: "",
  toggleFavorite: () => {},
  refreshFavorites: () => {},
});

export function MealDataProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  const loadFavorites = useCallback(async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      setFavoriteIds(new Set());
      return;
    }

    try {
      const favorites = await getFavorites();
      // Extract product IDs from favorites
      const ids = new Set();
      favorites.forEach((fav) => {
        if (fav.product && typeof fav.product === 'object') {
          ids.add(fav.product.id);
        } else if (fav.product_id) {
          ids.add(fav.product_id);
        } else if (typeof fav === 'number') {
          ids.add(fav);
        }
      });
      setFavoriteIds(ids);
    } catch (err) {
      console.error("Error loading favorites:", err);
      setFavoriteIds(new Set());
    }
  }, []);

  const refreshFavorites = useCallback(async () => {
    await loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
    const token = localStorage.getItem("access");

    const stripHtml = (html) => {
      if (typeof html !== "string") return "";
      return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    };

    const fetchData = async () => {
      setLoading(true);
      
      // Load favorites first if user is authenticated
      let currentFavoriteIds = new Set();
      if (token) {
        try {
          const favorites = await getFavorites();
          favorites.forEach((fav) => {
            if (fav.product && typeof fav.product === 'object') {
              currentFavoriteIds.add(fav.product.id);
            } else if (fav.product_id) {
              currentFavoriteIds.add(fav.product_id);
            } else if (typeof fav === 'number') {
              currentFavoriteIds.add(fav);
            }
          });
          setFavoriteIds(currentFavoriteIds);
        } catch (err) {
          console.error("Error loading favorites:", err);
        }
      }

      const endpoints = ["/api/products/", "/api/meals/"];
      for (const ep of endpoints) {
        try {
          const res = await fetch(`${API_BASE}${ep}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          
          if (!res.ok) {
            console.warn(`Endpoint ${ep} returned ${res.status}: ${res.statusText}`);
            continue;
          }
          
          const data = await res.json();
          const items = Array.isArray(data) ? data : data?.results || [];
          
          if (items.length > 0) {
            const normalized = items.map((it) => ({
              id: it.id,
              name: stripHtml(it.name || it.title || ""),
              description: stripHtml(it.description || it.text || ""),
              price: typeof it.price === "number" ? it.price : Number(it.price ?? 0),
              img: it.img || it.image || it.photo || it.image_url || "",
              is_favorited: currentFavoriteIds.has(it.id) || !!it.is_favorited,
            }));
            setMeals(normalized);
            setError("");
            setLoading(false);
            return;
          }
        } catch (err) {
          console.error(`Error fetching from ${ep}:`, err);
          setError(`Failed to load data from ${ep}: ${err.message}`);
        }
      }
      setError("Failed to load products from all endpoints");
      setLoading(false);
    };

    fetchData();
  }, []); // Load once on mount

  // Update meals when favoriteIds change (after initial load)
  useEffect(() => {
    if (meals.length > 0) {
      setMeals((prev) =>
        prev.map((m) => ({
          ...m,
          is_favorited: favoriteIds.has(m.id),
        }))
      );
    }
  }, [favoriteIds]);

  const toggleFavorite = useCallback(async (id) => {
    // Optimistically update UI
    setMeals((prev) => prev.map((m) => (m.id === id ? { ...m, is_favorited: !m.is_favorited } : m)));
    
    // Update favoriteIds set
    setFavoriteIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });

    // Reload favorites from server to ensure sync
    setTimeout(async () => {
      await loadFavorites();
    }, 300);
  }, [loadFavorites]);

  const value = useMemo(
    () => ({ meals, loading, error, toggleFavorite, refreshFavorites }),
    [meals, loading, error, toggleFavorite, refreshFavorites]
  );

  return <MealDataContext.Provider value={value}>{children}</MealDataContext.Provider>;
}
