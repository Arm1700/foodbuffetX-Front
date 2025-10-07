<<<<<<< HEAD
export default function New() {
    return (
        <div>
            <div className="w-full flex flex-col justify-center items-center min-h-[80vh] sm:min-h-[90vh] md:min-h-screen bg-cover bg-center bg-no-repeat bg-[url(public/bg.jpg)] relative px-4">
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="flex flex-col justify-center items-center relative gap-6 sm:gap-8 md:gap-10">
                    <div className="mt-24 sm:mt-32 md:mt-40 lg:mt-60">
                        <p className="text-red-500 text-center font-semibold tracking-wide text-xs sm:text-sm md:text-base">Welcome to FoodBuffet X</p>
                    </div>
                    <div className="flex flex-col items-center">

                        <h1 className="text-white font-serif text-center leading-tight font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px]">The best place to eat <br /> sushi in New York</h1>
                        <p className="text-white text-center font-light text-sm sm:text-base md:text-lg max-w-[90%] sm:max-w-2xl">Lorem ipsum dolor sit amet consectetur adipiscing elit ugue quam diam <br /> vitae velit bibendum elementum eget non vivamus </p>
                    </div>
                    <div className="flex gap-3 sm:gap-4">
                        <button className="button-hover relative overflow-hidden bg-red-500 text-white font-semibold py-2 rounded-lg w-[120px] h-[44px] sm:w-[140px] sm:h-[50px] md:h-[55px] shine text-xs sm:text-sm">
                            Call
                        </button>
                        <button className="bg-white border-2 border-black text-[#292929] font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300 w-[130px] h-[44px] sm:w-[145px] sm:h-[50px] md:h-[55px] shine text-xs">
                            Browse Menu                            </button>
                    </div>
                    <img className="w-full max-w-6xl h-[24vh] sm:h-[28vh] md:h-[34vh] lg:h-[40vh] relative top-4 left-0 object-contain" src="public/naxs.svg" alt="" />
=======
import { MediaImage } from '../../shared/utils/media';
export default function New() {
    return (
        <div>
            <div className="w-full  flex flex-col justify-center items-center h-[100vh] bg-cover bg-center bg-no-repeat bg-[url(/bg.jpg)] relative">
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="flex flex-col gap-10 justify-center items-center relative text-[18px] font-bold gap-3">
                    <div className="mt-60">
                        <p className="text-red-500  text-center font-semibold tracking-wide">Welcome to FoodBuffet X</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-white text-[90px] font-serif text-center leading-tight font-light">The best place to eat <br /> sushi in New York</h1>
                        <p className="text-white text-center text-[18px] font-light">Lorem ipsum dolor sit amet consectetur adipiscing elit ugue quam diam <br /> vitae velit bibendum elementum eget non vivamus </p>
                    </div>
                    <div className="flex gap-4">
                        <button className="button-hover relative overflow-hidden bg-red-500 text-white font-semibold py-2 rounded-lg w-[140px] h-[55px] shine text-ls">
                            Call
                        </button>
                        <button className="bg-white border-2 border-black text-[#292929] font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300 w-[145px] h-[55px] shine text-xs">
                            Browse Menu                            </button>
                    </div>
                    <img className="w-full h-[46vh] relative top-[19px] left-0" src="/naxs.svg" alt="" />
>>>>>>> 36b51af2920f9ff311faaa832b56c4b64e09b8fb
                </div>
            </div>
        </div>
    )
}