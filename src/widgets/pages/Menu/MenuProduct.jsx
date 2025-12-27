import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext"; // <- импортируем AuthContext

export default function MenuProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth(); // получаем текущего пользователя

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  const handleAddToCart = () => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }
    addToCart({ ...product, quantity });
    navigate("/cart");
  };

  return (
    <section className="relative w-full min-h-screen bg-black px-4 py-20 overflow-hidden border-b border-white">
      <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto pt-[13%]">
        {/* Info */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-10">
            <h1 className="text-6xl font-serif text-white max-w-xl">{product.name}</h1>
            <p className="text-gray-300 text-lg max-w-xl">{product.description}</p>
            <div className="flex items-center gap-4 font-serif">
              {product.oldPrice && (
                <span className="text-4xl text-white line-through">${product.oldPrice}</span>
              )}
              <span className="text-5xl font-semibold text-white">${product.price}</span>
            </div>
          </div>

          {/* ADD TO CART */}
          {!showQuantitySelector ? (
            <div className="flex gap-4 mb-16">
              <button
                className="w-[88%] py-6 bg-[#fd3117] text-white text-xl font-semibold hover:bg-orange-700 transition disabled:opacity-50"
                disabled={product.outOfStock || !user} // <- блокируем если не авторизован
                onClick={() => setShowQuantitySelector(true)}
              >
                {product.outOfStock ? "OUT OF STOCK" : !user ? "LOG IN TO ADD" : "ADD TO CART"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mb-16 w-[88%]">
              <div className="flex w-full items-center justify-between gap-4">
                {/* Количество */}
                <div className="flex items-center justify-between bg-[#630909] rounded-lg shadow-md px-4 py-3 min-w-[49%] h-14">
                  <span className="text-white font-semibold text-lg">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-[#440000] rounded-full text-white hover:bg-[#330000] transition"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      -
                    </button>
                    <span className="text-white font-semibold text-lg w-6 text-center">{quantity}</span>
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-[#440000] rounded-full text-white hover:bg-[#330000] transition"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Цена */}
                <div className="flex items-center justify-between bg-[#630909] rounded-lg shadow-md px-4 py-3 min-w-[49%] h-14">
                  <span className="text-white font-medium">Price:</span>
                  <span className="text-white font-bold text-lg">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                className="w-full py-6 bg-[#fd3117] text-white text-xl font-semibold hover:bg-orange-700 transition disabled:opacity-50"
                onClick={handleAddToCart}
                disabled={!user} // <- блокируем если не авторизован
              >
                { !user ? "LOG IN TO ADD" : "ADD TO CART & GO TO CART" }
              </button>
            </div>
          )}
        </div>

        {/* Image */}
        <div className="overflow-hidden border border-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[50vh] object-cover transition-transform duration-300 ease-in-out"
          />
        </div>
      </div>

      {/* Rings */}
      <img src="/rings/ringO.png" alt="" className="hidden lg:block absolute right-[-15%] top-[-25%] max-w-[25%]" />
      <img src="/rings/ringO.png" alt="" className="hidden lg:block absolute left-[-12%] bottom-[20%] max-w-[25%]" />
      <img src="/rings/ringO.png" alt="" className="hidden lg:block absolute right-[-17%] bottom-[-30%] max-w-[25%]" />
    </section>
  );
}
