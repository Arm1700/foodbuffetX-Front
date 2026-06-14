import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import './style.css';

import Header from './widgets/header/Header';
import About from './widgets/pages/About/About';
import Menu from './widgets/pages/Menu/Menu';
import Product from './widgets/pages/Product/Product';
import Contact from './widgets/pages/Contact/Contact';
import Footer from './widgets/footer/Footer';
import Account from './entities/account/Account';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />}/>
        <Route path="/Menu" element={<Menu />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Account" element={<Account />} />
        {/* Redirect /login and /login/ to /Account */}
        <Route path="/login" element={<Navigate to="/Account" replace />} />
        <Route path="/login/" element={<Navigate to="/Account" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
