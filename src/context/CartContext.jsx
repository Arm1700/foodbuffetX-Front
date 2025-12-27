import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const cartKey = user ? `cart_user_${user.id}` : null;

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!cartKey) {
      setCartItems([]);
      return;
    }

    const saved = localStorage.getItem(cartKey);
    setCartItems(saved ? JSON.parse(saved) : []);
  }, [cartKey]);

  useEffect(() => {
    if (cartKey) {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, cartKey]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
