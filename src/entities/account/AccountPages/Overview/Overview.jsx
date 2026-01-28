import { useContext } from "react";
import { MealDataContext } from "../../../../context/MealDataProvider";
import { useOrders } from "../../../../context/OrdersContext";

export default function Overview() {
  const { meals } = useContext(MealDataContext);
  const { orders, loading, error } = useOrders();

  if (loading) return <div className="p-6">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading orders</div>;

  const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
  const favoritesCount = meals.filter((meal) => meal.is_favorited).length;
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10);

  const buildImageUrl = (rawPath) => {
    if (!rawPath) return "/nkar1.jpg";
    if (rawPath.startsWith("http")) return rawPath;
    if (rawPath.startsWith("/")) return `${API_BASE}${rawPath}`;
    return `${API_BASE}/${rawPath}`;
  };

  return (
    <div className="px-[3%] py-6 w-full max-w-full">
      <h1 className="text-[#f93c22] text-2xl sm:text-[34px] font-bold mb-6">
        Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Total Spent" value={`$${totalSpent.toLocaleString()}`} />
        <StatCard title="Favorite Meals" value={favoritesCount} />
      </div>

      <div className="block">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Recent Orders
        </h2>

        <div className="relative w-full max-h-[350px] border border-gray-100 rounded-2xl bg-gray-50/50 p-2 overflow-hidden flex flex-col">
          <div
            className="overflow-y-auto pr-2 space-y-3 touch-pan-y
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-orange-400"
            style={{ maxHeight: '330px' }} 
          >
            {recentOrders.length === 0 ? (
              <div className="flex py-10 items-center justify-center opacity-60">
                <p className="text-gray-500 text-sm">No orders yet</p>
              </div>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-50/50">
                    <span className="text-[10px] font-bold text-gray-600">#{order.id}</span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="px-3 py-2 space-y-2">
                    {order.items.map((item) => {
                      const rawPath = item.img || item.image || "";
                      const imageUrl = buildImageUrl(rawPath);
                      const qty = Number(item.quantity ?? 0);
                      const name = item.name || "Item";
                      const lineTotal = Number(item.price ?? 0) * (Number.isFinite(qty) ? qty : 0);

                      return (
                        <div key={item.id} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={imageUrl}
                              alt={name}
                              className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                              onError={(e) => {
                                e.currentTarget.src = "/nkar1.jpg";
                              }}
                            />
                            <div className="min-w-0">
                              <p className="text-[11px] font-semibold text-gray-800 truncate">
                                {name}
                              </p>
                              <div className="mt-0.5">
                                <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-700">
                                  x{Number.isFinite(qty) ? qty : 0}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-[11px] font-bold text-gray-600">
                            ${Number(lineTotal || 0).toLocaleString()}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-3 py-1.5 bg-gray-50/30 border-t border-gray-50 flex justify-between">
                    <span className="text-[10px] text-gray-400">Total</span>
                    <span className="text-xs font-bold text-gray-900">${Number(order.total).toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#f93c22] to-[#FF724F] h-28 rounded-2xl shadow-md text-white p-4">
      <div className="text-2xl font-bold">{value}</div>
      <div className="opacity-90 mt-1 font-bold text-[10px] uppercase tracking-wider">{title}</div>
    </div>
  );
}