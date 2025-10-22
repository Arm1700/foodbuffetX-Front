import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./style.css";
import { BrowserRouter } from "react-router-dom";
import { MealDataProvider } from "./context/MealDataProvider";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext.jsx";

<<<<<<< HEAD
ReactDOM.createRoot(document.getElementById('root')).render(

    <App />

=======
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ProfileProvider>
        <MealDataProvider>
          <App />
        </MealDataProvider>
      </ProfileProvider>
    </AuthProvider>
  </BrowserRouter>
>>>>>>> 545554c354d1b124c2e674e5e67592bc9a94c13b
);
