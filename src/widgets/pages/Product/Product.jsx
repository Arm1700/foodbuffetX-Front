import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";

export default function Product() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

  useEffect(() => {
    // Прокручиваем наверх при загрузке страницы
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/api/products/${id}/`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setProduct({
          id: data.id,
          name: data.name || "",
          description: data.description || "",
          price: typeof data.price === "number" ? data.price : Number(data.price ?? 0),
          img: data.img || data.image || "",
          category_name: data.category_name || "",
          category_id: data.category_id || null,
        });
        setIsFavorited(!!data.is_favorited);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(`Failed to load product: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, API_BASE]);

  const toggleFavorite = async () => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem("access");
      const res = await fetch(`${API_BASE}/api/toggle-favorite/${id}/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (res.ok) {
        setIsFavorited(!isFavorited);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    setAddingToCart(true);
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      img: product.img || "/nkar1.jpg",
    });
    
    setTimeout(() => {
      setAddingToCart(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-red-600">{error || "Product not found"}</div>
      </div>
    );
  }

  return (
    <section className="section hero v9 pt-24 pb-16 md:pt-64 md:pb-24 bg-black text-white min-h-screen">
      <div className="container-default w-container">
        <div className="w-layout-grid grid-2-columns product-page gap-8 md:gap-12 items-start">
          {/* Левая колонка - Контент */}
          <div className="inner-container _600px---mbl flex flex-col justify-center h-full">
            <h1 className="display-2 text-light text-3xl md:text-4xl lg:text-5xl font-bold text-white font-serif mb-6">
              {product.name}
            </h1>
            
            <div className="inner-container _500px _100-tablet">
              <div className="mg-top-small mt-4">
                <div className="inner-container _600px---mbl">
                  <p className="color-neutral-300 text-gray-300 text-base md:text-lg leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
              
              <div className="mg-top-double-extra-large mt-8">
                <div className="flex-horizontal justify-start gap-row-8px---flex-wrap items-center gap-4">
                  <div className="heading-h2-size text-light text-2xl md:text-3xl font-bold text-white">
                    ${product.price.toFixed(2)} USD
                  </div>
                </div>
              </div>
              
              <div className="mg-top-large mt-8 cursor-pointer">
                <div className="add-to-cart">
                  <button 
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className="btn-primary width-100 bg-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addingToCart ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Правая колонка - Изображение */}
          <div className="image-wrapper border-line-white-image w-full">
            <img
              alt={product.name}
              loading="eager"
              src={product.img || "/nkar1.jpg"}
              onError={(e) => {
                e.currentTarget.src = "/nkar1.jpg";
              }}
              className="_w-h-100 fit-cover product-page-image w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

