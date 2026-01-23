import React from "react";
import { useInstagramPosts } from "../../../hooks/useContent";

export default function OurInstagram() {
  const { posts, loading } = useInstagramPosts();
  
  if (loading) {
    return (
      <section className="bg-neutral-200 py-16 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }
  
  const instagramImages = posts.map(post => ({
    src: post.image?.url || post.image_url || "",
    alt: post.alt_text || "Instagram Post",
    href: post.link || "https://www.instagram.com/",
    featured: post.is_featured
  }));
  return (
    <section className="bg-neutral-200 py-16 sm:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="text-center">
            <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black font-serif">
              Our Instagram
            </h2>
          </div>
          
          <div className="mt-8 sm:mt-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {instagramImages.map((image, index) => (
                <a
                  key={index}
                  href={image.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative block overflow-hidden cursor-pointer w-full h-full lg:min-h-[300px] md:min-h-[200px] sm:min-h-[100px] group ${
                    image.featured ? "sm:row-span-2 col-span-2 " : ""
                  }`}
                >
                  <img
                    src={image.src}
                    loading="eager"
                    alt={image.alt}
                    className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <img
                      src="https://cdn.prod.website-files.com/6648175f98e8b71e60b3e986/6648176098e8b71e60b3eb5c_instagram-icon-white-brix-templates.svg"
                      loading="eager"
                      alt="Instagram Icon"
                      className={`w-12 h-12 sm:w-16 sm:h-16 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-110 -rotate-4 group-hover:rotate-0 ${
                        image.featured ? "sm:w-16 sm:h-16" : ""
                      }`}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-12 sm:mt-16">
            <div className="flex justify-center">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                <div>Follow us</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

