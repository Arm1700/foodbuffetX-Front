import { useContext, useState } from "react";
import { MealDataContext } from "../../context/MealDataProvider";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { toggleFavorite as toggleFavoriteAPI } from "../../shared/api/auth";

export default function ProductsGrid() {
  const { meals, loading, error, toggleFavorite } = useContext(MealDataContext);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState({});
  const products = meals.slice(0, 8);

  const handleToggleFavorite = async (e, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return;
    
    try {
      await toggleFavoriteAPI(itemId);
      toggleFavorite(itemId);
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  const handleAddToCart = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAddingToCart(prev => ({ ...prev, [item.id]: true }));
    
    addToCart({
      id: item.id,
      name: item.name,
      description: item.description,
      price: typeof item.price === "number" ? item.price : Number(item.price ?? 0),
      img: item.img || "/nkar1.jpg",
    });
    
    setTimeout(() => {
      setAddingToCart(prev => ({ ...prev, [item.id]: false }));
    }, 500);
  };

  return (
    <div>
      <div className="space-y-4 flex flex-col justify-center items-center p-20">
        <h1 className="text-[72px] font-bold text-black font-serif">Browse our Menu</h1>
        <p className="text-gray-500 text-[18px] sans-serif leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo, <br /> elementus nibh velit enim nisi ultrices enim sed. Dictumst.
        </p>
      </div>
      {error && <div className="w-[90%] mx-auto text-red-600">{error}</div>}
      <div className="w-[90%] mx-auto">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="menu-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-[90%] mx-auto">
            {products.map((item) => {
              const isLiked = item.is_favorited;

              return (
                <div key={item.id} className="space-y-2 relative group">
                  <div className="relative">
                    <Link to={`/product/${item.id}`} className="block">
                      {user && (
                        <button
                          className="absolute top-3 left-3 cursor-pointer bg-[#333333] p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                          onClick={(e) => handleToggleFavorite(e, item.id)}
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

                      <div className="relative overflow-hidden">
                        <img
                          className="w-full h-56 md:h-90 object-cover transition-transform duration-300 ease-in-out origin-center group-hover:scale-105"
                          src={item.img || "/nkar1.jpg"}
                          onError={(e) => {
                            e.currentTarget.src = "/nkar1.jpg";
                          }}
                          alt={item.name}
                        />
                      </div>

                      <div className="absolute w-[100px] h-[40px] top-[10px] right-[10px] flex justify-center items-center bg-red-500">
                        <p className="text-white text-lg leading-relaxed font-semibold">
                          {typeof item.price === "number" ? `$${item.price.toFixed(2)}` : `$${Number(item.price ?? 0).toFixed(2)}`}
                        </p>
                      </div>
                    </Link>

                    <button
                      onClick={(e) => handleAddToCart(e, item)}
                      disabled={addingToCart[item.id]}
                      className="absolute bottom-3 right-3 bg-[#f93c22] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#e2331d] transition-colors z-10 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {addingToCart[item.id] ? "Adding..." : "Add to Cart"}
                    </button>
                  </div>

                  <h1 className="text-2xl font-bold text-black font-serif">{item.name}</h1>
                  <p className="text-gray-500 text-lg leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
