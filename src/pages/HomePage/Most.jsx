import { MediaImage } from '../../shared/utils/media';
export default function () {
    return (
        <div>
            <div className="flex flex-col sm:flex-row mt-20 gap-4 w-[90%] mx-auto justify-center items-center">
                <button className="button-hover relative overflow-hidden bg-red-500 text-white font-semibold py-3 px-6 rounded-lg w-full sm:w-[140px] h-[55px] shine text-sm">
                    Call
                </button>
                <button className="bg-white border-2 border-black text-[#292929] font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-300 w-full sm:w-[145px] h-[55px] shine text-sm">
                    Browse Menu
                </button>
            </div>
            <div className="w-full mx-auto mt-20 relative">
                <img className="absolute -z-10 w-[16%] h-[40%] top-[200px] right-[10%] hidden lg:block" src="/klor2.svg" alt="" />
                <div className="relative w-full">
                    <img className="w-full h-auto object-cover" src="/11.jpg" alt="" />
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 lg:p-24">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-serif leading-tight mb-4 md:mb-6">
                            Taste the most <br /> delicious sushi in <br /> New York
                        </h1>
                        <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi scelerisque dignissim vulputate vulputate posuere. Ipsum quis.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="button-hover relative overflow-hidden bg-red-500 text-white font-semibold py-3 px-6 rounded-lg w-full sm:w-[140px] h-[55px] shine text-sm">
                                Call
                            </button>
                            <button className="bg-white border-2 border-black text-[#292929] font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-300 w-full sm:w-[145px] h-[55px] shine text-sm">
                                Browse Menu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}