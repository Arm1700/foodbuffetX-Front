import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './style.css';
import { BrowserRouter } from 'react-router-dom';
import { MealDataProvider } from './context/MealDataProvider';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <MealDataProvider>
        <App />
      </MealDataProvider>
    </AuthProvider>
  </BrowserRouter>
);
