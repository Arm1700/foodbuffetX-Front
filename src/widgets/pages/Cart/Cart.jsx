import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import api from "../../../shared/api/api";

export default function Cart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  const handleBrowseMenu = () => {
    onClose();
    navigate("/Menu");
  };


  const handleCheckout = async () => {
    try {
      await api.post("/checkout/", {
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        }))
      });

      clearCart();
      onClose();
      navigate("/Account");
    } catch (err) {
      alert("Checkout failed");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Modal */}
        <div
          className="bg-white w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4 px-6 pt-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-black text-2xl font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Body - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cartItems.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <p className="text-lg mb-4">No items found.</p>
                <button
                  onClick={handleBrowseMenu}
                  className="px-6 py-2 bg-[#f93c22] text-white rounded-lg hover:bg-[#e2331d] transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 pb-4 border-b last:border-b-0"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 flex-shrink-0">
                        <img
                          src={item.img || "/nkar1.jpg"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = "/nkar1.jpg";
                          }}
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          ${typeof item.price === "number" ? item.price.toFixed(2) : Number(item.price ?? 0).toFixed(2)} USD
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-600 hover:text-red-600 underline text-sm transition-colors"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-12 text-center border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#f93c22]"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b">
                  <span className="text-gray-600 text-lg">Subtotal</span>
                  <span className="text-gray-900 font-bold text-xl">
                    ${getTotalPrice().toFixed(2)} USD
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t px-6 py-4">
              <button
                onClick={handleCheckout}
                className="w-full bg-[#f93c22] text-white py-4 rounded-lg font-semibold hover:bg-[#e2331d] transition-colors text-lg"
              >
                CONTINUE TO CHECKOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}