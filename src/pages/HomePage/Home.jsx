import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import MealBox from '../../shared/Box/MealBox';


export default function Home() {
    const slides = [
        {
            left: 'public/nkar.jpg',
            right: 'public/nkar1.jpg',
            title: '“The best sushi rolls ever”',
            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A ac ornare amet, sed vitae cras sem. Cursus praesent fames at vestibulum imperdiet sit. Sem netus ac, eu, facilisis mauris lectus posuere. At.'
        },
        {
            left: 'public/nkar1.jpg',
            right: 'public/nkar.jpg',
            title: '“Absolutely fresh and tasty”',
            text:
                'Praesent commodo cursus magna, vel scelerisque nisl consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.'
        }
    ];
    const [slideIndex, setSlideIndex] = useState(0);
    const swiperRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const rightSwiperRef = useRef(null);
    const clickPrev = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };
    const clickNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };
    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(slideIndex);
        }
    }, [slideIndex]);


    return (
        <div className="flex flex-col">
            <div className="w-full flex flex-col justify-center items-center h-[100vh] bg-cover bg-center bg-no-repeat bg-[url(public/bg.jpg)] relative">
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="flex flex-col justify-center items-center relative text-[18px] font-bold gap-5">
                    <div>
                        <p className="text-red-500 text-lg font-semibold tracking-wide">Welcome to FoodBuffet X</p>
                    </div>
                    <h1 className="text-white text-6xl md:text-6xl font-serif text-center leading-tight font-light">The best place to eat <br /> sushi in New York</h1>
                    <p className="text-white text-center text-sm leading-relaxed font-light">Lorem ipsum dolor sit amet consectetur adipiscing elit ugue quam diam <br /> vitae velit bibendum elementum eget non vivamus </p>
                    <div className="flex gap-4">
                        <button className="button-hover relative overflow-hidden bg-red-500 text-white font-semibold py-2 rounded-lg w-[140px] h-[55px] shine text-ls">
                            Call
                        </button>
                        <button className="bg-white border-2 border-black text-[#292929] font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300 w-[145px] h-[55px] shine text-xs">
                            Browse Menu                            </button>
                    </div>
                    <img className="w-full h-[46vh] relative top-[19px] left-0" src="public/naxs.svg" alt="" />
                </div>
            </div>
            <div className="relative p-20  bg-[#f7f7f7]">
                <img className=" absolute -z-10 w-[16%] h-[40%] top-[900px] left-[100px]" src="public/klor2.svg" alt="" />
                <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <img className="w-full h-[800px] object-cover" src="https://cdn.prod.website-files.com/6648175f98e8b71e60b3e986/664ccb67504a0403838bc2d6_manhattan-new-york-chef-foodbuffet-x-webflow-template.jpg" alt="Manhattan Chef" />
                        <div className="space-y-2">
                            <p className="text-black text-lg">Manhattan, New York</p>
                            <div className="flex items-center gap-4">
                                <p className="text-gray-500 text-lg">+1 (212) 857 - 0107</p>
                                <div className="w-px h-6 bg-gray-300"></div>
                                <p className="text-gray-500 text-lg">NEWYORK@FOODBUFFET.COM</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-black font-serif">About us</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit ugue quam diam vitae velit bibendum elementum eget non vivamus volutpat odio cras vestibulum lacus ut. In consequat.
                        </p>
                        <div className="flex gap-4">
                            <button className="button-hover relative overflow-hidden bg-red-500 text-white font-semibold py-2 rounded-lg w-[140px] h-[55px] shine text-ls">
                                Call
                            </button>
                            <button className="bg-white border-2 border-black text-[#292929] font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300 shine">
                                Browse Menu
                            </button>
                        </div>
                        <div className="relative ">
                            <img className=" w-[78%] h-[470px] z-20 object-cover relative rounded-lg" src="https://cdn.prod.website-files.com/6648175f98e8b71e60b3e986/664ccb67c1d31fa999787c13_delicious-sushi-foodbuffet-x-webflow-template.jpg" alt="Sushi Platter" />
                            <img className=" text-red-500 absolute w-[40%] top-[320px] left-[380px]" src="public/klor.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div className="space-y-4 flex flex-col justify-center items-center s p-20">
                        <h1 className="text-4xl md:text-5xl font-bold text-black font-serif">Browse our Menu</h1>
                        <p className="text-gray-500 text-lg leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo, <br /> elementus nibh velit enim nisi ultrices enim sed. Dictumst.</p>
                    </div>
                </div>
            </div>
            <MealBox />
            <div className="flex mt-20 gap-4  w-[90%] mx-auto justify-center items-center ">
                <button className="button-hover relative overflow-hidden bg-red-500 text-white font-semibold py-2 rounded-lg w-[140px] h-[55px] shine text-ls">
                    Call
                </button>
                <button className="bg-white border-2 border-black text-[#292929] font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300 w-[145px] h-[55px] shine text-xs">
                    Browse Menu
                </button>
            </div>
            <div className="w-full mx-auto mt-20">
                <img className="absolute -z-10 w-[16%] h-[40%] top-[3090px] left-[1100px]" src="public/klor2.svg" alt="" />
                <div className="relative w-full inline-block ">
                    <img src="public/11.jpg" alt="" />
                    <h1 className="absolute text-4xl md:text-5xl font-bold text-black font-serif top-[300px] left-[100px] text-white leading-tight">Taste the most <br /> delicious sushi in <br /> New York</h1>
                    <p className="absolute text-white text-lg leading-relaxed top-[500px] left-[100px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi <br /> scelerisque dignissim vulputate vulputate posuere. Ipsum quis.</p>
                    <button className="button-hover absolute top-[-501px] right-[-120px] relative overflow-hidden bg-red-500 text-white font-semibold py-2 rounded-lg w-[140px] h-[55px] shine text-ls">
                        Call
                    </button>
                    <button className="bg-white border-2  absolute top-[603px] right-[1073px] text-[#292929] font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300 w-[145px] h-[55px] shine text-xs">
                        Browse Menu
                    </button>
                </div>
            </div>


            <div className="grid grid-cols-3  p-10 items-center gap-8">
                <div className="space-y-8 ">
                    <div className="space-y-4">
                        <h1 className="text-center mb-4  text-4xl font-serif text-black">What our clients say</h1>
                        <p className="text-center mb-4  text-[#686868] font-sans leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus non leo  integer lacus scelerisque ut ac. Fermentum laoreet duis pulvinar.
                        </p>
                    </div>
                    <Swiper
                        modules={[Navigation, Controller]}
                        onSwiper={(instance) => {
                            swiperRef.current = instance;
                            setTimeout(() => {
                                if (!prevRef.current || !nextRef.current) return;
                                instance.params.navigation.prevEl = prevRef.current;
                                instance.params.navigation.nextEl = nextRef.current;
                                instance.navigation.init();
                                instance.navigation.update();
                                if (rightSwiperRef.current) {
                                    instance.controller.control = rightSwiperRef.current;
                                }
                            });
                        }}
                        onSlideChange={(s) => setSlideIndex(s.realIndex)}
                        slidesPerView={1}
                        loop
                        loopAdditionalSlides={4}
                        speed={600}
                        grabCursor
                        className="w-full cursor-grab active:cursor-grabbing select-none testimonial-swiper-left"
                    >
                        {slides.map((s, idx) => (
                            <SwiperSlide key={idx}>
                                <img draggable="false" src={s.left} alt="Sushi testimonial" className="w-full md:h-[500px] h-[300px] object-cover select-none" />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
                <div className="flex flex-col gap-6 items-start justify-center">

                    <div className="flex flex-col gap-3 max-w-[520px]">
                        <h1 className="text-4xl font-serif text-black">{slides[slideIndex].title}</h1>
                        <p className="text-[#686868] font-sans">{slides[slideIndex].text}</p>
                        <div className="mt-2">
                            <p className="text-black font-semibold">Sam Houston</p>
                            <p className="text-[#686868] text-sm">@samhouston</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4 relative">
                    <div className="absolute -top-20 right-50 z-20 flex items-center gap-3 pointer-events-auto">
                        <button type="button" onClick={clickPrev} ref={prevRef} className="w-12 h-12 rounded-full border-2 border-gray-400 text-gray-600 text-xl flex items-center justify-center hover:bg-gray-100 transition">&#10094;</button>
                        <button type="button" onClick={clickNext} ref={nextRef} className="w-12 h-12 rounded-full bg-red-600 border-2 border-red-600 text-white text-xl flex items-center justify-center hover:bg-red-700 transition">&#10095;</button>
                    </div>
                    <Swiper
                        modules={[Navigation, Controller]}
                        onSwiper={(inst) => {
                            rightSwiperRef.current = inst;
                            setTimeout(() => {
                                if (swiperRef.current) {
                                    inst.controller.control = swiperRef.current;
                                }
                            });
                        }}
                        loop
                        allowTouchMove={false}
                        className="w-full testimonial-swiper-right"
                    >
                        {slides.map((s, idx) => (
                            <SwiperSlide key={idx}>

                                <img draggable="false" className="w-full  top-0 left-20 md:h-[500px] h-[300px] object-cover select-none" src={s.right} alt="" />


                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
