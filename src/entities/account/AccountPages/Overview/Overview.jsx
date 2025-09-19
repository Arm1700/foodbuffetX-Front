

export default function Overview() {
  const stats = {
    orders: 24,
    spent: 12450,
    favorites: 8,
  };

  const recentOrders = [
    {
      id: "#12345",
      items: "Паста Карбонара, Цезарь салат, Тирамису",
      total: "₽1,250",
    },
    {
      id: "#12344",
      items: "Пицца Маргарита, Лимонад",
      total: "₽890",
    },
  ];

  return (
    <div className="px-[3%] py-6">
      <h1 className="text-[#f93c22] text-[34px] font-bold mb-6">
        Էջի ակնարկում
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
        {/* Orders */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#f93c22] to-[#FF724F] h-40 rounded-2xl shadow-lg text-white p-6 transform transition hover:-translate-y-1 hover:shadow-xl">
          <div className="text-4xl font-bold">{stats.orders}</div>
          <div className="opacity-90 mt-2 font-bold">Պատվերների քանակը</div>
        </div>

        {/* Spent */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#f93c22] to-[#FF724F] h-40 rounded-2xl shadow-lg text-white p-6 transform transition hover:-translate-y-1 hover:shadow-xl">
          <div className="text-4xl font-bold">
            ₽{stats.spent.toLocaleString()}
          </div>
          <div className="opacity-90 mt-2 font-bold">Ծախսված</div>
        </div>

        {/* Favorites */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#f93c22] to-[#FF724F] h-40 rounded-2xl shadow-lg text-white p-6 transform transition hover:-translate-y-1 hover:shadow-xl">
          <div className="text-4xl font-bold">{stats.favorites}</div>
          <div className="opacity-90 mt-2 font-bold">Սիրելի ուտեստներ</div>
        </div>
      </div>

      {/* Վերջին պատվերներ */}
      <h2 className="mt-[3%] text-2xl font-bold mb-4">Վերջին պատվերները</h2>
      <div className="space-y-4">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white border rounded-xl shadow p-5 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-[#f93c22]">{order.id}</span>
            </div>
            <div className="text-gray-600">{order.items}</div>
            <div className="font-bold text-gray-800 mt-2">{order.total}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
