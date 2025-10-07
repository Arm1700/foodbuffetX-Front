<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './style.css';
import { BrowserRouter } from 'react-router-dom';
import { MealDataProvider } from './context/MealDataProvider';
import { AuthProvider } from './context/AuthContext';
=======
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./context/DataProvider.jsx";
import MealDataProvider from "./context/MealDataProvider.jsx"; 
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext.jsx";
>>>>>>> 36b51af2920f9ff311faaa832b56c4b64e09b8fb

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
<<<<<<< HEAD
      <MealDataProvider>
        <App />
      </MealDataProvider>
=======
      <DataProvider>
        <ProfileProvider>
          <MealDataProvider>
            <App />
          </MealDataProvider>
        </ProfileProvider>
      </DataProvider>
>>>>>>> 36b51af2920f9ff311faaa832b56c4b64e09b8fb
    </AuthProvider>
  </BrowserRouter>
);
