import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../shared/api/api";
import { useAuth } from "./AuthContext";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const { accessToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("orders/");
        setOrders(res.data || []);
      } catch (err) {
        console.error("Ошибка загрузки заказов:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken]);

  const addOrder = async (orderPayload) => {
    if (!accessToken) return;
    try {
      const res = await api.post("orders/", orderPayload);
      setOrders((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Ошибка добавления заказа:", err);
      setError(err);
      throw err;
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loading,
        error,
        addOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
