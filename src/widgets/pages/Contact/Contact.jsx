
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// Replaced react-icons with simple characters to avoid extra dependency

export default function RestaurantSlider() {
  const restaurants = [
    {
      city: "Manhattan, NY",
      desc: "Duis aute irure dolor in reprehenderit in voluptate esse cillum dolore eu fugiat nulla pariatur occaecat",
      address: "934-235 N. Manhattan, New York, NY 90334",
      email: "manhattan@foodbuffet.com",
      phone: "(212) 809 - 5894",
      img: "/11.jpg",
    },
    {
      city: "Brooklyn, NY",
      desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.",
      address: "500 Brooklyn Ave, New York, NY 11201",
      email: "brooklyn@foodbuffet.com",
      phone: "(212) 456 - 7890",
      img: "/8.jpg",
    },
    {
      city: "Los Angeles, CA",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      address: "123 Sunset Blvd, Los Angeles, CA 90026",
      email: "la@foodbuffet.com",
      phone: "(310) 123 - 4567",
      img: "/11.jpg",
    },
  ];

  return (
    <section className="">
      <div className=" ">
          <img className="h-[50vh] relative left-271 top-189" src="/klor.svg" alt="" />
      </div>
      <div className="max-w-7xl mx-auto  px-50  ">
        
        <div className="flex items-center justify-between mb-10  p-5">
          <h2 className="text-5xl font-sans font-serif px-1 ">Visit our restaurants</h2>
          <div className="flex gap-4">
            <button className="custom-prev w-12 h-12 border border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-100" aria-label="Previous">
              ←
            </button>
            <button className="custom-next w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600" aria-label="Next">
              →
            </button>
          </div>
           
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          spaceBetween={30}
          slidesPerView={1}
        >
{restaurants.map((rest, index) => (
  <SwiperSlide key={index}>
    <div className="relative ">
      {/* Image */}
      <img src={rest.img} alt={rest.city} className=" " />

      {/* Info Card */}
      <div className="absolute top-2/8  left-1/2  -translate-x-1/3 
                      bg-white shadow-xl p-10  border 
                      w-[380px]  ">
        <h3 className="text-2xl font-bold mb-4">{rest.city}</h3>
        <p className="text-gray-600 mb-5 leading-relaxed">{rest.desc}</p>
        <ul className="space-y-2 text-gray-700 text-base">
          <li className="flex items-center gap-2"><span aria-hidden>📍</span> {rest.address}</li>
          <li className="flex items-center gap-2"><span aria-hidden>✉️</span> {rest.email}</li>
          <li className="flex items-center gap-2"><span aria-hidden>☎️</span> {rest.phone}</li>
        </ul>
        
      </div>
    </div>
  </SwiperSlide>
))}



        </Swiper>
      </div>
   
    </section>
    
  );
}
