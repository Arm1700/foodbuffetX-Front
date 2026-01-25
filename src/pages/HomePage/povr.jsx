import { useHomePageContent } from "../../hooks/useContent";
import { Link } from "react-router-dom";
import { stripHtmlTags } from "../../utils/htmlUtils";

export default function Povr() {
    const { content, loading } = useHomePageContent();
    
    if (loading) {
        return (
            <div className="p-10 bg-[#f7f7f7]">
                <div className="text-center">Loading...</div>
            </div>
        );
    }
    
    const title = stripHtmlTags(content?.about_us_title) || "About us";
    const description = stripHtmlTags(content?.about_us_description) || "Lorem ipsum dolor sit amet consectetur adipiscing elit ugue quam diam vitae velit bibendum elementum eget non vivamus volutpat odio cras vestibulum lacus ut. In consequat.";
    const callText = stripHtmlTags(content?.about_us_button_call_text) || "Call";
    const menuText = stripHtmlTags(content?.about_us_button_menu_text) || "Browse Menu";
    const location = stripHtmlTags(content?.about_us_location) || "Manhattan, New York";
    const phone = stripHtmlTags(content?.about_us_phone) || "+1 (212) 857 - 0107";
    const email = stripHtmlTags(content?.about_us_email) || "NEWYORK@FOODBUFFET.COM";
    const image1 = content?.about_us_image_1_data?.url || content?.about_us_image_1_url || "https://cdn.prod.website-files.com/6648175f98e8b71e60b3e986/664ccb67504a0403838bc2d6_manhattan-new-york-chef-foodbuffet-x-webflow-template.jpg";
    const image2 = content?.about_us_image_2_data?.url || content?.about_us_image_2_url || "https://cdn.prod.website-files.com/6648175f98e8b71e60b3e986/664ccb67c1d31fa999787c13_delicious-sushi-foodbuffet-x-webflow-template.jpg";
    
    return (
        <div className=" p-10  bg-[#f7f7f7] ">
            <div className="relative max-w-[1280px] mx-auto">
                <img className=" absolute -z-10 w-[16%] h-[40%] top-[900px] left-[100px]" src="/klor2.svg" alt="" />
                <div className="grid lg:grid-cols-[1fr_40%] grid-cols-[1fr_1fr] gap-8">
                    <img 
                        className="lg:row-span-2 lg:w-[610px] lg:h-[758px] w-full h-[480px] object-cover" 
                        src={image1} 
                        alt="Manhattan Chef"
                        onError={(e) => {
                            e.currentTarget.src = "/nkar1.jpg";
                        }}
                    />
                    <div className="space-y-8 row-1 col-span-2 lg:col-2">
                        <h2 className=" text-[72px] font-bold text-black font-serif">{title}</h2>
                        <p className="text-gray-600 text-[18px] leading-relaxed">
                            {description}
                        </p>
                        <div className="flex gap-4">
                            <a href="tel:+12128095894" className="button-hover relative overflow-hidden bg-red-500 text-white font-semibold py-2 rounded-lg w-[140px] h-[55px] shine text-ls flex items-center justify-center">
                                {callText}
                            </a>
                            <Link to="/Menu" className="bg-white border-2 border-black text-[#292929] font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300 shine flex items-center justify-center">
                                {menuText}
                            </Link>
                        </div>
                    </div>
                    <img 
                        className="lg:row-span-2  self-end w-full lg:h-[420px] h-[480px] z-20 object-cover relative rounded-lg" 
                        src={image2} 
                        alt="Sushi Platter"
                        onError={(e) => {
                            e.currentTarget.src = "/nkar1.jpg";
                        }}
                    />
                    <div className="space-y-2 row-3">
                        <p className="text-black  text-[28px]">{location}</p>
                        <div className="flex items-center gap-4">
                            <p className="text-gray-500 text-[18px]">{phone}</p>
                            <div className="w-px h-6 bg-gray-300"></div>
                            <p className="text-gray-500 text-[18px]">{email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
