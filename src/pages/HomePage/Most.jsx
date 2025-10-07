<<<<<<< HEAD
export default function Most() {
    return (
        <div>
            <div className="flex mt-10 md:mt-20 gap-4 w-[90%] mx-auto justify-center items-center">
                <button className="button-hover relative overflow-hidden bg-red-500 text-white font-semibold py-2 rounded-lg w-[140px] h-[48px] md:h-[55px] shine text-xs md:text-sm">
                    Call
                </button>
                <button className="bg-white border-2 border-black text-[#292929] font-semibold py-3 px-6 md:px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300 w-[145px] h-[48px] md:h-[55px] shine text-xs">
                    Browse Menu
                </button>
            </div>

            <div className="w-full mx-auto mt-10 md:mt-20">
                <img
                    className="hidden xl:block absolute -z-10 w-[14%] h-auto top-[3250px] left-[1130px]"
                    src="public/klor2.svg"
                    alt=""
                />

                <div className="relative w-full inline-block">
                    <img
                        src="public/11.jpg"
                        alt="Hero"
                        className="w-[2225px] h-[1065px]   object-cover"
                    />

                    <div className="absolute inset-0 flex items-end md:items-start">
                        <div className="w-full max-w-2xl p-4 sm:p-8 md:p-12 lg:p-20 space-y-4 sm:space-y-6 md:mt-16 lg:mt-24 xl:mt-28">
                            <h1 className="text-white font-serif font-bold leading-tight text-3xl sm:text-4xl md:text-5xl">
                                Taste the most <br /> delicious sushi in <br /> New York
                            </h1>
                            <p className="hidden sm:block text-white text-sm sm:text-base md:text-lg leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi scelerisque dignissim
                                vulputate vulputate posuere. Ipsum quis.
                            </p>
                            <div className="flex gap-3 sm:gap-4 pt-2">
                                <button className="button-hover relative overflow-hidden bg-red-500 text-white font-semibold py-2 rounded-lg w-[120px] h-[44px] sm:w-[140px] sm:h-[48px] md:h-[55px] shine text-xs sm:text-sm">
                                    Call
                                </button>
                                <button className="bg-white border-2 border-black text-[#292929] font-semibold py-2 sm:py-3 px-5 sm:px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300 w-[130px] h-[44px] sm:w-[145px] sm:h-[48px] md:h-[55px] shine text-xs">
                                    Browse Menu
                                </button>
                            </div>
=======
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
>>>>>>> 36b51af2920f9ff311faaa832b56c4b64e09b8fb
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}