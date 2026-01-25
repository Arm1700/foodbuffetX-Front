import OurInstagram from "../../components/OurInstagram/OurInstagram";
import { useAboutPageContent } from "../../../hooks/useContent";
import { stripHtmlTags } from "../../../utils/htmlUtils";

export default function About() {
  const { content, loading } = useAboutPageContent();
  
  if (loading) {
    return (
      <div className="container-default w-container pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="text-center">Loading...</div>
      </div>
    );
  }
  
  const image1 = content?.image_1_data?.url || content?.image_1_url || "https://cdn.prod.website-files.com/6648175f98e8b71e60b3e986/664e0958e37b0df60b603319_about-hero-image-01-foodbuffet-x-webflow-template.jpg";
  const image2 = content?.image_2_data?.url || content?.image_2_url || "https://cdn.prod.website-files.com/6648175f98e8b71e60b3e986/664e0958e0e0fbe32b007b59_about-hero-image-02-foodbuffet-x-webflow-template.jpg";
  
  return (
    <>
      <div className="container-default w-container pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="z-index-1">
          <div className="w-layout-grid grid-2-columns hero-layout-v1-grid gap-8 md:gap-12">
            {/* Left side - Large image */}
            <div className="image-wrapper hero-layout-v1-image-wrapper-01 w-full h-full">
              <img 
                src={image1}
                loading="eager" 
                alt="About Hero Image 01" 
                className="w-full h-full object-cover hero-layout-v1-image-01"
                onError={(e) => {
                  e.currentTarget.src = "/nkar1.jpg";
                }}
              />
            </div>

            {/* Right side - Content section 1 */}
            <div className="inner-container hero-layout-v1-content-01 flex flex-col justify-center">
              <div className="inner-container">
                <h1 className="display-1 text-4xl md:text-5xl lg:text-6xl font-bold text-black font-serif mb-6">
                  {stripHtmlTags(content?.main_title) || "Our story started back in 1984"}
                </h1>
              </div>
              <div className="mg-top-small">
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {stripHtmlTags(content?.text_1) || "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}
                </p>
              </div>
            </div>

            {/* Right side - Content section 2 */}
            <div className="inner-container hero-layout-v1-content-02 flex flex-col justify-center">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {stripHtmlTags(content?.text_2) || "Duis aute irure dolor in reprehenderit..."}
              </p>
              {content?.text_3 && (
                <div className="mg-top-default mt-6">
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    {stripHtmlTags(content.text_3)}
                  </p>
                </div>
              )}
            </div>

            {/* Right side - Second image */}
            <div className="image-wrapper hero-layout-v1-image-wrapper-02 w-full h-full">
              <img 
                src={image2}
                loading="eager" 
                alt="About Hero Image 02" 
                className="w-full h-full object-cover hero-layout-v1-image-02"
                onError={(e) => {
                  e.currentTarget.src = "/nkar1.jpg";
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <OurInstagram />
    </>
  )
}