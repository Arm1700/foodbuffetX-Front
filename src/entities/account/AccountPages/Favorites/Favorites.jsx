import { useContext } from "react";
import { MealDataContext } from "../../../../context/MealDataProvider";

export default function Favorites() {
  const { meals } = useContext(MealDataContext);

  const favorites = meals.filter((meal) => meal.is_favorited);

  return (
    <div className="px-[3%] py-6 h-full flex flex-col">
      <h1 className="text-[#f93c22] text-2xl sm:text-[34px] font-bold mb-6">
        Սիրելի ուտեստներ
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-sm sm:text-base">
          Դուք դեռ չեք ավելացրել ձեր սիրելի ուտեստները։
        </p>
      ) : (
        <div className="flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="bg-white border rounded-xl shadow p-4 sm:p-5 hover:shadow-lg transition flex flex-col"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-[#f93c22] text-sm sm:text-base">
                    {fav.name}
                  </span>
                  {fav.price && (
                    <span className="font-bold text-sm sm:text-base">
                      ₽{fav.price}
                    </span>
                  )}
                </div>
                <div className="text-gray-600 mb-3 text-xs sm:text-sm">
                  {fav.description}
                </div>
                <button className="mt-auto px-3 sm:px-4 py-2 bg-[#f93c22] text-white rounded-xl hover:bg-[#e2331d] transition text-sm sm:text-base">
                  Պատվիրել
                </button>
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
