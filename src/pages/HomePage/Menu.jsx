import { useContext } from "react";
<<<<<<< HEAD
=======
import { Heart } from "phosphor-react";
>>>>>>> 36b51af2920f9ff311faaa832b56c4b64e09b8fb
import { MealDataContext } from "../../context/MealDataProvider";
import { useAuth } from "../../context/AuthContext";

export default function ProductsGrid() {
  const { meals, loading, error, toggleFavorite } = useContext(MealDataContext);
  const { user } = useAuth();

  const products = meals.slice(0, 8);

<<<<<<< HEAD


  return (
    <div>
      <div className="space-y-4 flex flex-col justify-center items-center p-20">
        <h1 className="text-[72px] font-bold text-black font-serif">Browse our Menu</h1>
        <p className="text-gray-500 text-[18px] sans-serif leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo, <br /> elementus nibh velit enim nisi ultrices enim sed. Dictumst.
        </p>
      </div>

      {error && <div className="w-[90%] mx-auto text-red-600">{error}</div>}

=======
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
>>>>>>> 36b51af2920f9ff311faaa832b56c4b64e09b8fb
      <div className="w-[90%] mx-auto">
        {loading ? (
          <div>Loading...</div>
        ) : (
<<<<<<< HEAD
          <div className="menu-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-[90%] mx-auto">
=======
          <div className="grid grid-cols-4 gap-10 w-[90%] mx-auto">
>>>>>>> 36b51af2920f9ff311faaa832b56c4b64e09b8fb
            {products.map((item) => {
              const isLiked = item.is_favorited;

              return (
<<<<<<< HEAD
                <div key={item.id} className="space-y-2 relative group ">
                  {user && (
                    <button
                      className="absolute top-3 left-3 cursor-pointer bg-[#333333] p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-10"
                      onClick={() => toggleFavorite(item.id)}
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
=======
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
>>>>>>> 36b51af2920f9ff311faaa832b56c4b64e09b8fb
                      alt={item.name}
                    />
                  </div>

<<<<<<< HEAD
                  <div className="absolute w-[100px] h-[40px] top-[10px] right-[10px] flex justify-center items-center bg-red-500">
                    <p className="text-white text-lg leading-relaxed font-semibold">
                      {typeof item.price === "number" ? `$${item.price.toFixed(2)}` : `$${Number(item.price ?? 0).toFixed(2)}`}
                    </p>
                  </div>

                  <h1 className="text-2xl font-bold text-black font-serif">{(item.name)}</h1>
                  <p className="text-gray-500 text-lg leading-relaxed">{(item.description)}</p>
=======
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
>>>>>>> 36b51af2920f9ff311faaa832b56c4b64e09b8fb
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 36b51af2920f9ff311faaa832b56c4b64e09b8fb
