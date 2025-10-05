import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import './style.css';
import Header from './widgets/header/Header';
import About from './widgets/pages/About/About';
import Menu from './widgets/pages/Menu/Menu';
import Contact from './widgets/pages/Contact/Contact';
import Cart from './widgets/pages/Cart/Cart';
<<<<<<< HEAD
import Footer from './widgets/footer/Footer';
=======
import Account from './entities/account/account';
>>>>>>> 545554c354d1b124c2e674e5e67592bc9a94c13b

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
<<<<<<< HEAD
      
=======
>>>>>>> 545554c354d1b124c2e674e5e67592bc9a94c13b
        <Route path='/About' element={<About />}/>
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Account" element={<Account />} />
      </Routes>
<<<<<<< HEAD
      <Footer />
    </Router>
=======
    </>
>>>>>>> 545554c354d1b124c2e674e5e67592bc9a94c13b
  );
}

export default App;
