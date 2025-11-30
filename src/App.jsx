import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import './style.css';

import Header from './widgets/header/Header';
import About from './widgets/pages/About/About';
import Menu from './widgets/pages/Menu/Menu';
import Contact from './widgets/pages/Contact/Contact';
import Cart from './widgets/pages/Cart/Cart';
import Footer from './widgets/footer/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />}/>
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
