import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { toggleFavorite as toggleFavoriteAPI } from "../../../shared/api/auth";

export default function Menu() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ count: 0, next: null, previous: null });

  const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

  // Загружаем категории
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/categories/`);
        if (res.ok) {
          const data = await res.json();
          const cats = Array.isArray(data) ? data : data?.results || [];
          setCategories(["All", ...cats.map(c => c.name)]);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, [API_BASE]);

  // Прокручиваем наверх при смене страницы
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedCategory]);

  // Загружаем продукты с пагинацией
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ page: currentPage.toString() });
        if (selectedCategory !== "All") {
          params.append('category', selectedCategory);
        }
        
        const res = await fetch(`${API_BASE}/api/products/?${params}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        console.log("API Response:", data); // Для отладки
        
        // Обрабатываем пагинированный ответ
        const items = Array.isArray(data) ? data : data?.results || [];
        const normalized = items.map((it) => ({
          id: it.id,
          name: it.name || "",
          description: it.description || "",
          price: typeof it.price === "number" ? it.price : Number(it.price ?? 0),
          img: it.img || it.image || "",
          is_favorited: !!it.is_favorited,
          category_name: it.category_name || "",
          category_id: it.category_id || null,
        }));
        
        setMeals(normalized);
        
        // Сохраняем информацию о пагинации
        if (data.count !== undefined) {
          setPagination({
            count: data.count,
            next: data.next,
            previous: data.previous,
          });
        } else {
          // Если пагинация не работает, устанавливаем count из длины массива
          setPagination({
            count: items.length,
            next: null,
            previous: null,
          });
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(`Failed to load products: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, selectedCategory, API_BASE]);

  // Используем загруженные продукты напрямую (фильтрация на бэкенде)
  const filteredProducts = meals;

  const toggleFavorite = async (id) => {
    if (!user) return;
    
    // Optimistically update UI
    setMeals((prev) => prev.map((m) => (m.id === id ? { ...m, is_favorited: !m.is_favorited } : m)));
    
    try {
      await toggleFavoriteAPI(id);
    } catch (err) {
      console.error("Error toggling favorite:", err);
      // Revert on error
      setMeals((prev) => prev.map((m) => (m.id === id ? { ...m, is_favorited: !m.is_favorited } : m)));
    }
  };

  return (
    <section className="section hero v7 pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container-default w-container">
        <div className="z-index-1">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <h1 className="display-1 text-4xl md:text-5xl lg:text-6xl font-bold text-black font-serif mb-6">
              Our menu
            </h1>
            <div className="mg-top-small">
              <div className="inner-container max-w-[530px] mx-auto">
                <p className="text-gray-600 text-base md:text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit aliquam imperdiet nisl duis arcu morbi <span className="text-no-wrap">libero namac.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Фильтры по категориям */}
          <div className="mg-top-medium mb-16">
            <div className="categories-badge-wrapper center flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1); // Сбрасываем страницу при смене категории
                  }}
                  className={`badge-secondary category-badges px-6 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Сетка продуктов */}
          {error && (
            <div className="w-[90%] mx-auto text-red-600 text-center mb-8">{error}</div>
          )}
          
          <div className="mg-top-100px relative">
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                <div className="text-gray-500 text-lg">Loading...</div>
              </div>
            )}
            <div className={`grid-4-columns menu-grid-v1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
              {filteredProducts.map((item) => {
                  const isLiked = item.is_favorited;

                  return (
                    <div
                      key={item.id}
                      className="product-card-v1-wrapper group cursor-pointer"
                    >
                      <Link to={`/product/${item.id}`} className="block">
                        <div className="product-card-image-wrapper relative overflow-hidden rounded-lg">
                          <img
                            className="card-image w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                            src={item.img || "/nkar1.jpg"}
                            onError={(e) => {
                              e.currentTarget.src = "/nkar1.jpg";
                            }}
                            alt={item.name}
                          />
                          <div className="badge-wrapper-top-left badge-right-16px absolute top-4 right-4">
                            <div className="badge-primary small text-bold bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                              ${typeof item.price === "number" 
                                ? item.price.toFixed(2) 
                                : Number(item.price ?? 0).toFixed(2)}
                            </div>
                          </div>
                          {user && (
                            <button
                              className="absolute top-4 left-4 cursor-pointer bg-[#333333] p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(item.id);
                              }}
                              aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={isLiked ? "#ea580c" : "none"}
                                stroke={isLiked ? "#ea580c" : "#ffffff"}
                                strokeWidth="2"
                                className="w-6 h-6"
                              >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                              </svg>
                            </button>
                          )}
                        </div>
                        <div className="product-card-content mt-4">
                          <h2 className="card-title display-4 text-2xl font-bold text-black font-serif mb-2">
                            {item.name}
                          </h2>
                          <p className="mg-top-extra-small text-gray-600 text-base leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                  })}
                </div>
              
              {/* Пагинация */}
              {pagination.count > 0 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.max(1, prev - 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={!pagination.previous || currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  
                  <span className="text-gray-700">
                    Page {currentPage} of {Math.ceil(pagination.count / 8)}
                  </span>
                  
                  <button
                    onClick={() => {
                      setCurrentPage(prev => prev + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={!pagination.next}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}