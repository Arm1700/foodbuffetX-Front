import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useHomePageContent } from "../../hooks/useContent";
import { stripHtmlTags } from "../../utils/htmlUtils";

export default function TestimonialsSwiper() {
    const { content, loading } = useHomePageContent();
    
    const swiperRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    
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
    
    if (loading) {
        return (
            <div className="overflow-hidden">
                <div className="p-4 lg:p-10">
                    <div className="text-center">Loading...</div>
                </div>
            </div>
        );
    }
    
    const title = stripHtmlTags(content?.testimonials_title) || "What our clients say";
    const description = stripHtmlTags(content?.testimonials_description) || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus non leo integer lacus scelerisque ut ac. Fermentum laoreet duis pulvinar.";
    const testimonials = content?.testimonials?.filter(t => t.is_active) || [];
    
    // Если нет отзывов, показываем дефолтные
    const slides = testimonials.length > 0 ? testimonials : [
        {
            image_url: '/nkar1.jpg',
            title: '"The best sushi rolls ever"',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A ac ornare amet, sed vitae cras sem. Cursus praesent fames at vestibulum imperdiet sit. Sem netus ac, eu, facilisis mauris lectus posuere. At.',
            author: 'Sam Houston',
            handle: '@samhouston'
        },
        {
            image_url: '/nkar.jpg',
            title: '"Absolutely fresh and tasty"',
            text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
            author: 'Sophie Moore',
            handle: '@sophiemoore'
        }
    ];
    
    return (
        <div className="overflow-hidden">
            <div className="p-4 lg:p-10">
                <div className="space-y-8 relative">
                    <div className="flex justify-between items-start">
                        <div className="space-y-4 text-start max-w-[400px]">
                            <h1 className=" mb-4 text-[42px]  font-serif text-black">{title}</h1>
                            <p className="text-center mb-4 text-[#686868] font-sans leading-relaxed">
                                {description}
                            </p>
                        </div>
                        <div className="flex items-center gap-3 pointer-events-auto">
                            <button type="button" onClick={clickPrev} ref={prevRef} className="w-12 h-12 rounded-full border-2 border-gray-400 text-gray-600 text-xl flex items-center justify-center hover:bg-gray-100 transition button1">&#10094;</button>
                            <button type="button" onClick={clickNext} ref={nextRef} className="w-12 h-12 rounded-full bg-red-500 border-2 border-red-600 text-white text-xl flex items-center justify-center hover:bg-red-700 transition button1">&#10095;</button>
                        </div>
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
                            }, 100);
                        }}
                        slidesPerView={1.2}
                        loop
                        rewind={true}
                        loopAdditionalSlides={50}
                        watchSlidesProgress={true}
                        speed={600}
                        grabCursor
                        className="w-full cursor-grab active:cursor-grabbing select-none testimonial-swiper"
                    >
                        {slides.map((s, idx) => {
                            const imageUrl = s.image_data?.url || s.image_url || '/nkar1.jpg';
                            return (
                                <SwiperSlide key={idx}>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
                                        <div className="flex justify-center">
                                            <img 
                                                draggable="false" 
                                                src={imageUrl} 
                                                alt="Sushi testimonial" 
                                                className="w-[70%] md:w-[562px] object-cover select-none rounded-lg"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/nkar1.jpg";
                                                }}
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center gap-6 px-4">
                                            <div className="space-y-4">
                                                <h2 className="text-3xl lg:text-4xl font-serif text-black leading-tight">{stripHtmlTags(s.title)}</h2>
                                                <p className="text-[#686868] font-sans text-lg leading-relaxed">{stripHtmlTags(s.text)}</p>
                                            </div>
                                            <div className="mt-4">
                                                <p className="text-black font-semibold text-lg">{stripHtmlTags(s.author)}</p>
                                                {s.handle && (
                                                    <p className="text-[#686868] text-sm">{stripHtmlTags(s.handle)}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
