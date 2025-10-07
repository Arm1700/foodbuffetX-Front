import { useState } from "react";
import MealBox from "./MealBox";
import meals from "./HomeArray";

export default function MealList() {
  const [mealList, setMealList] = useState(meals());

  const toggleFavorite = (id) => {
    setMealList(mealList.map(m => m.id === id ? { ...m, is_favorited: !m.is_favorited } : m));
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {mealList.map(meal => (
        <MealBox key={meal.id} meal={meal} toggleFavorite={() => toggleFavorite(meal.id)} />
      ))}
    </div>
  );
}
