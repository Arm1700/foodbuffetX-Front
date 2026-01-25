import { useHomePageContent } from "../../hooks/useContent";
import { Link } from "react-router-dom";
import { stripHtmlTags } from "../../utils/htmlUtils";

export default function New() {
    const { content, loading } = useHomePageContent();
    
    if (loading) {
        return (
            <div className="w-full flex flex-col justify-center items-center min-h-[80vh]">
                <div className="text-center">Loading...</div>
            </div>
        );
    }
    
    const welcomeText = stripHtmlTags(content?.hero_welcome_text) || "Welcome to FoodBuffet X";
    const mainTitle = stripHtmlTags(content?.hero_main_title) || "The best place to eat sushi in New York";
    const description = stripHtmlTags(content?.hero_description) || "Lorem ipsum dolor sit amet consectetur adipiscing elit ugue quam diam vitae velit bibendum elementum eget non vivamus";
    const callText = stripHtmlTags(content?.hero_button_call_text) || "Call";
    const menuText = stripHtmlTags(content?.hero_button_menu_text) || "Browse Menu";
    const menuLink = content?.hero_button_menu_link || "/Menu";
    const backgroundImage = content?.hero_background_image_data?.url || content?.hero_background_image_url || "/bg.jpg";
    
    return (
        <div>
            <div 
                className="w-full flex flex-col justify-center items-center min-h-[80vh] sm:min-h-[90vh] md:min-h-screen bg-cover bg-center bg-no-repeat relative px-4"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="flex flex-col justify-center items-center relative gap-6 sm:gap-8 md:gap-10">
                    <div className="mt-24 sm:mt-32 md:mt-40 lg:mt-60">
                        <p className="text-red-500 text-center font-semibold tracking-wide text-xs sm:text-sm md:text-base">{welcomeText}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-white font-serif text-center leading-tight font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px]">{mainTitle}</h1>
                        <p className="text-white text-center font-light text-sm sm:text-base md:text-lg max-w-[90%] sm:max-w-2xl">{description}</p>
                    </div>
                    <div className="flex gap-3 sm:gap-4">
                        <a href="tel:+12128095894" className="button-hover relative overflow-hidden bg-red-500 text-white font-semibold py-2 rounded-lg w-[120px] h-[44px] sm:w-[140px] sm:h-[50px] md:h-[55px] shine text-xs sm:text-sm flex items-center justify-center">
                            {callText}
                        </a>
                        <Link to={menuLink} className="bg-white border-2 border-black text-[#292929] font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300 w-[130px] h-[44px] sm:w-[145px] sm:h-[50px] md:h-[55px] shine text-xs flex items-center justify-center">
                            {menuText}
                        </Link>
                    </div>
                    <img className="w-full max-w-6xl h-[24vh] sm:h-[28vh] md:h-[34vh] lg:h-[40vh] relative top-0 left-0 object-contain" src="/naxs.svg" alt="" />
                </div>
            </div>
        </div>
    )
}