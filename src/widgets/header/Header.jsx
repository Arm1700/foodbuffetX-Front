import { Link } from "react-router-dom";
export default function Header() {

  return (
<<<<<<< HEAD
    <div className="fixed top-0 left-0 w-full z-50 bg-black text-white p-4 flex justify-around items-cente">

  

        <div className="flex space-x-6 ">
            <Link to="/About">About</Link>
            <Link to="/Menu">Menu</Link>
            
            <Link to="/">     
            <img   src="https://cdn.prod.website-files.com/6648175f98e8b71e60b3e986/664bbc6fee6471421c62c3b9_logo-web-white-foodbuffet-x-webflow-template.svg" alt="logo" className="h-7 " />
      
            </Link>  
            <Link to="/Contact">Contact</Link>
            <Link to="/Cart">Cart</Link>
=======
    <div className="bg-black text-white p-4 flex justify-around items-center absolute w-full top-0 z-10">
        <div className="flex space-x-6">
          <Link to="/About">About</Link>
          <Link to="/Menu">Menu</Link>

          <Link to="/">     
          <img   src="https://cdn.prod.website-files.com/6648175f98e8b71e60b3e986/664bbc6fee6471421c62c3b9_logo-web-white-foodbuffet-x-webflow-template.svg" alt="logo" className="h-7 " />
    
          </Link>  
          <Link to="/Contact">Contact</Link>
          <Link to="/Cart">Cart</Link>
      </div>

      <div>
        <Link to="/Account">Login/Register</Link>
>>>>>>> 545554c354d1b124c2e674e5e67592bc9a94c13b
      </div>
    </div>
  )
}