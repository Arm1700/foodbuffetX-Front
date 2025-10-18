import { useContext } from "react";
import { useProfile } from "../../../../context/ProfileContext";
import { MealDataContext } from "../../../../context/MealDataProvider";

export default function Overview() {
  const { profile } = useProfile();
  const { meals } = useContext(MealDataContext);

  // Favorite meals count
  const favoritesCount = meals.filter(meal => meal.is_favorited).length;

  // Orders count and total spent
  const orders = profile?.orders || []; 
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  // last 3 orders
  const recentOrders = orders.slice(-3).reverse();

  return (
    <div className="px-[3%] py-6">
      <h1 className="text-[#f93c22] text-2xl sm:text-[34px] font-bold mb-6">
        Էջի ակնարկում
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Orders */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#f93c22] to-[#FF724F] h-32 sm:h-40 rounded-2xl shadow-lg text-white p-4 sm:p-6 transform transition hover:-translate-y-1 hover:shadow-xl">
          <div className="text-3xl sm:text-4xl font-bold">{totalOrders}</div>
          <div className="opacity-90 mt-2 font-bold text-sm sm:text-base">
            Պատվերների քանակը
          </div>
        </div>

        {/* Spent */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#f93c22] to-[#FF724F] h-32 sm:h-40 rounded-2xl shadow-lg text-white p-4 sm:p-6 transform transition hover:-translate-y-1 hover:shadow-xl">
          <div className="text-3xl sm:text-4xl font-bold">
            ₽{totalSpent.toLocaleString()}
          </div>
          <div className="opacity-90 mt-2 font-bold text-sm sm:text-base">
            Ծախսված
          </div>
        </div>

        {/* Favorites */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#f93c22] to-[#FF724F] h-32 sm:h-40 rounded-2xl shadow-lg text-white p-4 sm:p-6 transform transition hover:-translate-y-1 hover:shadow-xl">
          <div className="text-3xl sm:text-4xl font-bold">{favoritesCount}</div>
          <div className="opacity-90 mt-2 font-bold text-sm sm:text-base">
            Սիրելի ուտեստներ
          </div>
        </div>
      </div>

      {/* Վերջին պատվերներ */}
      <h2 className="mt-[3%] text-xl sm:text-2xl font-bold mb-4">
        Վերջին պատվերները
      </h2>
      <div className="space-y-4">
        {recentOrders.length === 0 && (
          <p className="text-gray-500">Դուք դեռ պատվեր չունեք։</p>
        )}
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white border rounded-xl shadow p-4 sm:p-5 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-[#f93c22]">{order.id}</span>
            </div>
            <div className="text-gray-600 text-sm sm:text-base">{order.items}</div>
            <div className="font-bold text-gray-800 mt-2 text-sm sm:text-base">
              ₽{order.total.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
