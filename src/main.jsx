import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./context/DataProvider.jsx";
import MealDataProvider from "./context/MealDataProvider.jsx"; 
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext.jsx";
import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <DataProvider> {/* если нужен */}
        <ProfileProvider>
          <MealDataProvider>
            <CartProvider>
              <OrdersProvider>
                <App />
              </OrdersProvider>
            </CartProvider>
          </MealDataProvider>
        </ProfileProvider>
      </DataProvider>
    </AuthProvider>
  </BrowserRouter>
);
