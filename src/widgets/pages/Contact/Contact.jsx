import React from "react";
import OurInstagram from "../../components/OurInstagram/OurInstagram";
import { useContactPageContent } from "../../../hooks/useContent";

export default function Contact() {
  const { content, loading } = useContactPageContent();
  
  if (loading) {
    return (
      <div className="container-default w-container pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="text-center">Loading...</div>
      </div>
    );
  }
  
  return (
    <>
      <div className="container-default w-container pt-24 pb-16 md:pt-32 md:pb-24">
        <div className=" title-and-slide mb-12">
          <div>
            <h2 className="display-2  w-full text-4xl md:text-5xl lg:text-6xl font-bold text-black font-serif">
              {content?.page_title || "Visit our restaurants"}
            </h2>
          </div>
        </div>
        
        {content && (
          <div className="mt-12 md:mt-16">
            <div className="z-index-1">
              <div className="card-right-over-image-wrapper relative">
                <div className="image-wrapper location-image-left w-[60%]">
                  <img
                    src={content.location_image_data?.url || content.location_image_url || ""}
                    loading="eager"
                    alt={content.location_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/nkar1.jpg";
                    }}
                  />
                </div>
                
                <div className="card location-card-right-over-image relative md:absolute top-auto md:top-[10%] right-0 md:right-[10%] bg-white p-6 md:p-12 shadow-lg w-[50%] md:max-w-[90%] -mt-8 md:mt-8 md:translate-y-8 z-10">
                  <div className="inner-container">
                    <div className="inner-container mb-6">
                      <h3 className="display-3 text-2xl md:text-3xl font-bold text-black font-serif mb-4">
                        {content.location_name}
                      </h3>
                      <div className="mg-top-small">
                        <p className="text-gray-600 text-base leading-relaxed">
                          {content.location_description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mg-top-medium mt-6">
                      <div className="inner-container _275px">
                        <div className="w-layout-grid grid-1-column gap-row-24px flex flex-col gap-6">
                          <a
                            href={content.location_map_link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-icon-link inline-flex items-start gap-3 text-gray-700 hover:text-red-600 transition-colors"
                          >
                            <div className="line-square-icon link-icon-left _20px text-xl flex-shrink-0 mt-1">📍</div>
                            <div>{content.location_address}</div>
                          </a>
                          
                          <a
                            href={`mailto:${content.location_email}`}
                            className="contact-icon-link inline-flex items-start gap-3 text-gray-700 hover:text-red-600 transition-colors break-all"
                          >
                            <div className="line-square-icon link-icon-left _20px text-xl flex-shrink-0 mt-1">✉</div>
                            <div className="text-break-all break-all">
                              {content.location_email}
                            </div>
                          </a>
                          
                          <a
                            href={`tel:${content.location_phone}`}
                            className="contact-icon-link inline-flex items-start gap-3 text-gray-700 hover:text-red-600 transition-colors"
                          >
                            <div className="line-square-icon link-icon-left _20px text-xl flex-shrink-0 mt-1">📞</div>
                            <div>{content.location_phone}</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <OurInstagram />
    </>
  );
}
