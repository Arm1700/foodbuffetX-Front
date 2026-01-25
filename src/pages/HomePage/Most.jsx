import { Link } from "react-router-dom";
import { useHomePageContent } from "../../hooks/useContent";
import { stripHtmlTags } from "../../utils/htmlUtils";

export default function Most() {
    const { content, loading } = useHomePageContent();
    
    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }
    
    const title = stripHtmlTags(content?.most_title) || "Taste the most delicious sushi in New York";
    const description = stripHtmlTags(content?.most_description) || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi scelerisque dignissim vulputate vulputate posuere. Ipsum quis.";
    const menuLink = "/Menu";
    const menuText = stripHtmlTags(content?.most_button_menu_text) || "Browse Menu";
    const sectionImage = content?.most_section_image_data?.url || content?.most_section_image_url || "/11.jpg";
    
    return (
        <div>
            <div className="flex flex-col sm:flex-row mt-20 gap-4 w-[90%] mx-auto justify-center items-center">
                <a href="tel:+12128095894" className="button-hover relative overflow-hidden bg-red-500 text-white font-semibold py-3 px-6 rounded-lg w-full sm:w-[140px] h-[55px] shine text-sm flex items-center justify-center">
                    Call
                </a>
                <Link 
                    to={menuLink}
                    className="bg-white border-2 border-black text-[#292929] font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-300 w-full sm:w-[145px] h-[55px] shine text-sm flex items-center justify-center"
                >
                    {menuText}
                </Link>
            </div>
            <div className="w-full mx-auto mt-20 relative">
                <img className="absolute -z-10 w-[16%] h-[40%] top-[200px] right-[10%] hidden lg:block" src="/klor2.svg" alt="" />
                <div className="relative w-full">
                    <img 
                        className="w-full h-auto object-cover" 
                        src={sectionImage} 
                        alt="Most delicious sushi"
                        onError={(e) => {
                            e.currentTarget.src = "/11.jpg";
                        }}
                    />
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 lg:p-24">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-serif leading-tight mb-4 md:mb-6">
                            {title.split('\n').map((line, i) => (
                                <span key={i}>
                                    {line}
                                    {i < title.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                        </h1>
                        <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-md">
                            {description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="tel:+12128095894" className="button-hover relative overflow-hidden bg-red-500 text-white font-semibold py-3 px-6 rounded-lg w-full sm:w-[140px] h-[55px] shine text-sm flex items-center justify-center">
                                Call
                            </a>
                            <Link 
                                to={menuLink}
                                className="bg-white border-2 border-black text-[#292929] font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-300 w-full sm:w-[145px] h-[55px] shine text-sm flex items-center justify-center"
                            >
                                {menuText}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}