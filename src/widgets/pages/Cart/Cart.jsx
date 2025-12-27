import { useCart } from "../../../context/CartContext";
import { useOrders } from "../../../context/OrdersContext";
import { useProfile } from "../../../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { profile } = useProfile();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const { user } = useAuth();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

const handleCheckout = async () => {
  if (cartItems.length === 0) return;

  try {
    setLoading(true);

    await addOrder({
      items: cartItems.map(item => ({
        product: item.id,
        quantity: item.quantity,
      })),
    });

    clearCart();

  } catch (err) {
    console.error("Ошибка при оформлении заказа:", err);
  } finally {
    setLoading(false);
  }
};

  if (!user) {
  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
          <p className="text-gray-500 mb-6">
            Please login or register to view your cart.
          </p>
          <button onClick={() => navigate("/Account")} className="bg-[#f93c22] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e6361b] transition" >
            Login / Register
          </button>
        </div>
      </div>
    );
  }


  console.log(cartItems);
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button className="text-gray-500 hover:text-black text-xl">✕</button>
        </div>

        {/* Body */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="py-8 text-center text-gray-500 text-lg">
              No items found.
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg" >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <button className="w-8 h-8 flex items-center justify-center bg-[#440000] rounded-full text-white hover:bg-[#330000] transition" onClick={() =>updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                        -
                      </button>
                      <span className="text-white bg-[#630909] px-3 py-1 rounded-lg font-semibold">
                        {item.quantity}
                      </span>
                      <button className="w-8 h-8 flex items-center justify-center bg-[#440000] rounded-full text-white hover:bg-[#330000] transition" onClick={() => updateQuantity(item.id, item.quantity + 1) } >
                        +
                      </button>
                      <span className="text-gray-500 ml-2">
                        × ${Number(item.price).toFixed(2)}
                      </span>
                      <span className="font-semibold ml-2">
                        = ${(Number(item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-700 text-xl" onClick={() => removeFromCart(item.id)} >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex justify-between font-semibold text-xl">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full bg-[#f93c22] text-white py-4 text-lg font-semibold rounded-lg hover:bg-[#e6361b] transition" onClick={handleCheckout} >
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
