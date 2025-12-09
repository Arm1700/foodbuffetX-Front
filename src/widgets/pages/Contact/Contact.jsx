import React from "react";

const gallery = [
  { src: "/1.jpg", href: "https://www.instagram.com/p/AAA111", title: "Sushi Duo" },
  { src: "/1.jpg", href: "https://www.instagram.com/p/BBB222", title: "Sushi Duo" },
  { src: "/1.jpg", href: "https://www.instagram.com/p/CCC333", title: "Sushi Duo" },
  { src: "/1.jpg", href: "https://www.instagram.com/p/DDD444", title: "Sushi Duo" },
  { src: "/1.jpg", href: "https://www.instagram.com/p/EEE555", title: "Sushi Duo" }
];

export default function Contact() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="flex flex-col gap-14 sm:gap-20">
        <div className="w-full max-w-[760px] mx-auto">
          <img
            src="/1.jpg"
            alt="Featured sushi"
            className="w-full h-full object-cover rounded-lg shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-8 sm:gap-12">
          <div className="flex justify-center px-2 text-center">
            <p className="text-[34px] sm:text-[48px] md:text-[60px] font-bold text-black font-serif">
              Our Instagram
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4 sm:gap-6">
              {gallery.map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${idx === 0 ? "md:row-span-2" : ""} group block overflow-hidden rounded-lg shadow-sm`}
                  title={item.title}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4.2" />
                        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
