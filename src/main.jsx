import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./context/DataProvider.jsx";
import MealDataProvider from "./context/MealDataProvider.jsx"; 
import { AuthProvider, useAuth } from "./context/AuthContext";
 

// Обёртка, чтобы получить userId из AuthContext
function AppWrapper() {
    const { user } = useAuth(); // user.id нужен для localStorage
    return (
        <MealDataProvider userId={user?.id || 0}>
            <App />
        </MealDataProvider>
    );
}

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <DataProvider> 
                <AppWrapper />
            </DataProvider>
        </AuthProvider>
    </BrowserRouter>
);
