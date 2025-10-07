import { useContext } from "react";
import { Heart } from "phosphor-react";
import { Link } from "react-router-dom";
import { MealDataContext } from "../../context/MealDataProvider";
import { useAuth } from "../../context/AuthContext";

export default function MealBox() {
  const { meals, toggleFavorite } = useContext(MealDataContext);
  const { user } = useAuth(); // берём текущего пользователя

  return (
    <div className="grid grid-cols-3 gap-6 p-10">
      {meals.map((meal) => {
        const isLiked = meal.is_favorited;

        return (
          <div
            key={meal.id}
            className="relative flex flex-col gap-4 justify-center py-7 rounded-3xl text-left h-min"
          >
            {/* Кнопка лайка только для авторизованных */}
            {user && (
              <div
                className="absolute top-10 left-3 cursor-pointer bg-[#333333] p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                onClick={() => toggleFavorite(meal.id)}
              >
                <Heart
                  size={28}
                  weight={isLiked ? "fill" : "regular"}
                  className={isLiked ? "text-orange-600" : "text-black"}
                />
              </div>
            )}

            {/* Картинка блюда */}
            <Link to={`/meals/${meal.id}`}>
              <img
                src={meal.img || "/placeholder.jpg"}
                alt={meal.name}
                className="w-full h-[40vh] object-cover rounded-3xl"
              />
            </Link>

            {/* Название и описание */}
            <p className="text-2xl font-bold line-clamp-2">{meal.name}</p>
            <p className="text-gray-500 text-lg leading-relaxed">{meal.description}</p>

            {/* Цена, если есть */}
            {meal.price && (
              <div className="absolute w-[100px] h-[40px] top-10 right-3 flex justify-center items-center bg-red-500">
                <p className="text-white font-semibold text-lg">${meal.price}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
