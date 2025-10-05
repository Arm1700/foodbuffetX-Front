import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./context/DataProvider.jsx";
import MealDataProvider from "./context/MealDataProvider.jsx"; 
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext.jsx";

<<<<<<< HEAD
ReactDOM.createRoot(document.getElementById('root')).render(

    <App />

=======
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <DataProvider>
        <ProfileProvider>
          <MealDataProvider>
            <App />
          </MealDataProvider>
        </ProfileProvider>
      </DataProvider>
    </AuthProvider>
  </BrowserRouter>
>>>>>>> 545554c354d1b124c2e674e5e67592bc9a94c13b
);
