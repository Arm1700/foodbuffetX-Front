
import { ImFacebook } from "react-icons/im";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12  px-6 ">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10   grid-cols-subgrid  ">
        {/* Left Section */}
        <div className="  h-50 border-gray-800 pr-6">
          <div className="flex items-center gap-2 mb-4 ">
         <Link to="/">
             <img src="https://cdn.prod.website-files.com/6648175f98e8b71e60b3e986/664bbc6fee6471421c62c3b9_logo-web-white-foodbuffet-x-webflow-template.svg" alt="" className="h-7 "/>
          </Link>
          </div>
          <p className="text-sm text-gray-400 mb-6">
            Lorem ipsum dolor sit amet consectetur dolol drakgonil adipiscing elit aliqua.
          </p>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="mt-1">
                <button className="button-hover relative overflow-hidden bg-red-500 text-white font-semibold py-2 rounded-lg  w-[140px] h-[55px] shine text-ls">
                    Follow
                </button>
            </a>
        </div>

        {/* Menu */}
        <div className="grid  gap-10   grid-cols-subgrid  col-span-3 border-s border-gray-800 pl-6">
        <div className=" ">
          <h3 className="font-semibold mb-4"><Link to="Menu">Menu</Link></h3>
        
          <ul className="space-y-2 text-gray-300 text-sm ">
          
            <li>HOME V1</li>
            <li>HOME V2</li>
            <li>HOME V3</li>
        
   
          </ul>
        </div>

             <div className="">
          <h3 className="font-semibold mb-4"><Link to="About">About</Link></h3>
        </div>

        {/* Utility Pages */}
        <div className="">
            <h3 className="font-semibold mb-4"><Link to="Contact">Contact</Link></h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>START HERE</li>
        
          </ul>
        </div>

   
          {/* Instagram */}
        <div className="grid col-end-2  ">
          <h3 className="font-semibold  ">Follow on Instagram</h3>
          <div className="  grid grid-cols-4 gap-2">
            <img src="./public/1.jpg" alt="sushi" className=" h-45  object-cover" />
            <img src="./public/2.jpg" alt="sushi" className="w-full h-30 object-cover" />
            <img src="./public/3.jpg" alt="sushi" className="w-full h-30 object-cover" />
            <img src="./public/4.jpg" alt="sushi" className="w-full h-30 object-cover" />
          </div>
        </div>
    
      </div>
      </div>
   
    {/* Bottom */}
      <div className="border-t border-gray-800  mt-10 pt-6 flex  md:flex-row place-content-around  text-white">
        <p>
          Copyright © Foodbuffet X | Designed by BRIX Templates - Powered by Webflow
        </p>
        <div className="flex gap-4 mt-4 md:mt-0 text-xl">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"> <ImFacebook /></i>
          </a>
              
               <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">       
          <i className="fab fa-instagram"><AiFillInstagram /></i>
          </a>

        </div>
      </div>
  
    </footer>
    
  );
}
