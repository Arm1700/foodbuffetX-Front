

export default function Favorites() {
  const favorites = [
    {
      id: 1,
      name: "🍝 Պաստա Կարբոնարա",
      desc: "Կլասիկ պաստա բեկոնով ու պանիրով",
      price: 450,
    },
    {
      id: 2,
      name: "🍕 Պիցցա Մարգարիտա",
      desc: "Կլասիկ իտալական պիցցա",
      price: 650,
    },
  ];

  return (
    <div className="px-[3%] py-6">
      <h1 className="text-[#f93c22] text-[34px] font-bold mb-6">Սիրելիներ</h1>

      <div className="space-y-4">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="bg-white border rounded-xl shadow p-5 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-[#f93c22]">{fav.name}</span>
              <span className="font-bold">₽{fav.price}</span>
            </div>
            <div className="text-gray-600 mb-3">{fav.desc}</div>
            <button className="px-4 py-2 bg-[#f93c22] text-white rounded-xl hover:bg-[#e2331d] transition">
              Պատվիրել
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
