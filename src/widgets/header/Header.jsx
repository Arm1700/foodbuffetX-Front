import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black text-white p-4 flex justify-center">

  

        <div className="flex space-x-6 ">
            <Link to="/About">About</Link>
            <Link to="/Menu">Menu</Link>
            
            <Link to="/">     
            <img   src="https://cdn.prod.website-files.com/6648175f98e8b71e60b3e986/664bbc6fee6471421c62c3b9_logo-web-white-foodbuffet-x-webflow-template.svg" alt="logo" className="h-7 " />
      
            </Link>  
            <Link to="/Contact">Contact</Link>
            <Link to="/Cart">Cart</Link>
      </div>

      <div className="absolute right-4 top-4">
        <Link to="/Account">Login/Register</Link>
      </div>
    </div>
  )
}