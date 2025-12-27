import { useContext } from "react";
import { useProfile } from "../../../../context/ProfileContext";
import { MealDataContext } from "../../../../context/MealDataProvider";
import { useOrders } from "../../../../context/OrdersContext";

export default function Overview() {
  const { profile } = useProfile();
  const { meals } = useContext(MealDataContext);
  const { orders = [], loading, error } = useOrders();

  if (loading) return <div className="p-6 text-lg">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading orders</div>;

  const favoritesCount = meals.filter(meal => meal.is_favorited).length;
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const recentOrders = orders.slice(-5).reverse(); // Взял чуть больше для теста скролла

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };
  return (
    <div className="px-[3%] py-6 max-w-7xl mx-auto">
      <h1 className="text-[#f93c22] text-2xl sm:text-[34px] font-bold mb-6">
        Էջի ակնարկում
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Карточка 1 - Количество заказов */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#f93c22] to-[#FF724F] h-32 rounded-2xl shadow-md text-white p-4 transform transition hover:-translate-y-1 hover:shadow-xl overflow-hidden">
          <div className="text-2xl sm:text-3xl font-bold truncate w-full text-center">
            {formatNumber(totalOrders)}
          </div>
          <div className="opacity-90 mt-1 font-semibold text-[10px] sm:text-xs uppercase tracking-wider text-center">
            Պատվերների քանակը
          </div>
        </div>
        
        {/* Карточка 2 - Потрачено (Самая проблемная) */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#f93c22] to-[#FF724F] h-32 rounded-2xl shadow-md text-white p-4 transform transition hover:-translate-y-1 hover:shadow-xl overflow-hidden">
          <div className={`font-bold whitespace-nowrap leading-none w-full text-center 
            ${totalSpent > 999999 ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`}>
            ֏ {formatNumber(totalSpent)}
          </div>
          <div className="opacity-90 mt-1 font-semibold text-[10px] sm:text-xs uppercase tracking-wider text-center">
            Ծախսված
          </div>
        </div>
          
        {/* Карточка 3 - Избранное */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#f93c22] to-[#FF724F] h-32 rounded-2xl shadow-md text-white p-4 transform transition hover:-translate-y-1 hover:shadow-xl overflow-hidden">
          <div className="text-2xl sm:text-3xl font-bold truncate w-full text-center">
            {formatNumber(favoritesCount)}
          </div>
          <div className="opacity-90 mt-1 font-semibold text-[10px] sm:text-xs uppercase tracking-wider text-center">
            Սիրելի ուտեստներ
          </div>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-bold mb-4 text-gray-800">
        Վերջին պատվերները
      </h2>

      <div className="relative">
        <div className="max-h-[380px] overflow-y-auto pr-2 space-y-3
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-gray-200
          [&::-webkit-scrollbar-thumb]:rounded-full
          hover:[&::-webkit-scrollbar-thumb]:bg-orange-300
          transition-all duration-300">
          
          {recentOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 opacity-60">
              <p className="text-gray-500 text-sm">Դուք դեռ պատվեր չունեք</p>
            </div>
          )}

          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:border-orange-100 transition-all duration-200 overflow-hidden"
            >
              {/* Header - стал компактнее */}
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50/30">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-600">
                    №{order.id}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400">{order.created_at}</span>
              </div>

              {/* Items - компактный список */}
              <div className="px-3 py-2 space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative">
                        <img
                          src={item.image ? (item.image.startsWith("http") ? item.image : `http://127.0.0.1:8000${item.image}`) : "/placeholder-food.jpg"}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded-lg shadow-sm"
                        />
                        <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full border border-white font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="min-w-0 leading-tight">
                        <p className="text-xs font-semibold text-gray-700 truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-400">֏{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-gray-600 tabular-nums">
                      ֏{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer - компактная итоговая сумма */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 border-t border-gray-50">
                <span className="text-[10px] font-medium text-gray-400">Ընդհանուր</span>
                <span className="text-xs font-bold text-gray-900">
                  ֏{order.total.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Градиент внизу для эффекта глубины */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
}