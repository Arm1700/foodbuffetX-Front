import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import Cart from "../pages/Cart/Cart";

export default function Header() {
  const { user, clearAuth } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleExit = () => {
    clearAuth();
    navigate("/");
  };

  const cartItemCount = getTotalItems();

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-black text-white p-4 flex justify-center">
          <div className="flex space-x-6 ">
              <Link to="/About">About</Link>
              <Link to="/Menu">Menu</Link>
              
              <Link to="/">     
              <img   src="https://cdn.prod.website-files.com/6648175f98e8b71e60b3e986/664bbc6fee6471421c62c3b9_logo-web-white-foodbuffet-x-webflow-template.svg" alt="logo" className="h-7 " />
        
              </Link>  
              <Link to="/Contact">Contact</Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative hover:text-red-500 transition-colors"
              >
                Cart
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#f93c22] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
        </div>

        <div className="absolute right-4 top-4 flex gap-4">
          {user ? (
            <>
              <Link to="/Account" className="hover:text-red-500 transition-colors">Profile</Link>
              <button 
                onClick={handleExit}
                className="hover:text-red-500 transition-colors"
              >
                Exit
              </button>
            </>
          ) : (
            <Link to="/Account">Login/Register</Link>
          )}
        </div>
      </div>

      {/* Cart Modal */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}