import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./style.css";
import { BrowserRouter } from "react-router-dom";
import { MealDataProvider } from "./context/MealDataProvider";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext.jsx";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ProfileProvider>
        <MealDataProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </MealDataProvider>
      </ProfileProvider>
    </AuthProvider>
  </BrowserRouter>
);
