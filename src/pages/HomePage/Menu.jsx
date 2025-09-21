import { useContext } from "react";
import { Heart } from "phosphor-react";
import { MealDataContext } from "../../context/MealDataProvider";
import { useAuth } from "../../context/AuthContext";

export default function ProductsGrid() {
  const { meals, loading, error, toggleFavorite } = useContext(MealDataContext);
  const { user } = useAuth();

  const products = meals.slice(0, 8);

  return (
    <div>
      <div className="space-y-4 flex flex-col justify-center items-center p-20">
        <h1 className="text-[72px] font-bold text-black font-serif">
          Browse our Menu
        </h1>
        <p className="text-gray-500 text-[18px] sans-serif leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo, <br />
          elementus nibh velit enim nisi ultrices enim sed. Dictumst.
        </p>
      </div>

      {/* error */}
      {error && <div className="w-[90%] mx-auto text-red-600">{error}</div>}

      {/* content */}
      <div className="w-[90%] mx-auto">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-4 gap-10 w-[90%] mx-auto">
            {products.map((item) => {
              const isLiked = item.is_favorited;

              return (
                <div key={item.id} className="space-y-2 relative group">
                  {/* like */}
                  {user && (
                    <div
                      className="absolute top-3 left-3 cursor-pointer bg-[#333333] p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                      onClick={() => toggleFavorite(item.id)}
                    >
                      <Heart
                        size={24}
                        weight={isLiked ? "fill" : "regular"}
                        className={isLiked ? "text-orange-600" : "text-white"}
                      />
                    </div>
                  )}

                  {/* image */}
                  <div className="relative overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out origin-center group-hover:scale-105"
                      src={item.img || "/placeholder.jpg"}
                      alt={item.name}
                    />
                  </div>

                  {/* price */}
                  <div className="absolute w-[100px] h-[40px] top-[10px] right-[10px] flex justify-center items-center bg-red-500">
                    <p className="text-white text-lg leading-relaxed font-semibold">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  {/* title */}
                  <h1 className="text-2xl font-bold text-black font-serif">
                    {item.name}
                  </h1>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
