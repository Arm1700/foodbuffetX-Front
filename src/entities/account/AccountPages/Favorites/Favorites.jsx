import { useContext } from "react";
import { Link } from "react-router-dom";
import { MealDataContext } from "../../../../context/MealDataProvider";
import { useCart } from "../../../../context/CartContext";

export default function Favorites() {
  const { meals } = useContext(MealDataContext);
  const { addToCart } = useCart();

  const favorites = meals.filter((meal) => meal.is_favorited);

  const handleAddToCart = (fav) => {
    addToCart({
      id: fav.id,
      name: fav.name,
      description: fav.description,
      price: typeof fav.price === "number" ? fav.price : Number(fav.price ?? 0),
      img: fav.img || "/nkar1.jpg",
    });
  };

  return (
    <div className="px-[3%] py-6 h-full flex flex-col">
      <h1 className="text-[#f93c22] text-2xl sm:text-[34px] font-bold mb-6">
        Favorite Meals
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-sm sm:text-base">
          You haven't added any favorite meals yet.
        </p>
      ) : (
        <div className="flex-1 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="bg-white border rounded-xl shadow-lg p-4 sm:p-5 hover:shadow-xl transition-all flex flex-col group"
              >
                {/* Image */}
                <Link to={`/product/${fav.id}`} className="block mb-3">
                  <div className="relative overflow-hidden rounded-lg h-48">
                    <img
                      src={fav.img || "/nkar1.jpg"}
                      alt={fav.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "/nkar1.jpg";
                      }}
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <Link to={`/product/${fav.id}`}>
                    <h3 className="font-semibold text-[#f93c22] text-lg sm:text-xl mb-2 hover:underline">
                      {fav.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-3 text-sm sm:text-base line-clamp-2 flex-1">
                    {fav.description}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-lg text-gray-900">
                      ${typeof fav.price === "number" ? fav.price.toFixed(2) : Number(fav.price ?? 0).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(fav)}
                    className="w-full px-4 py-2 bg-[#f93c22] text-white rounded-xl hover:bg-[#e2331d] transition-colors text-sm sm:text-base font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CSS для кастомного скролла */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #ffe5df;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #f93c22, #ff724f);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #e2331d, #ff5c3a);
        }
      `}</style>
    </div>
  );
}
