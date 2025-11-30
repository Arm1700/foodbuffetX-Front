export default function Povr() {
    return (
        <div className=" p-10  bg-[#f7f7f7] ">
            <div className="relative max-w-[1280px] mx-auto">
                <img className=" absolute -z-10 w-[16%] h-[40%] top-[900px] left-[100px]" src="/klor2.svg" alt="" />
                {/* <img className=" text-red-500 absolute w-[40%] top-[320px] left-[380px]" src="/klor.svg" alt="" /> */}
                <div className="grid lg:grid-cols-[1fr_40%] grid-cols-[1fr_1fr] gap-8">
                    <img className="lg:row-span-2 lg:w-[610px] lg:h-[758px] w-full h-[480px] object-cover" src="https://cdn.prod.website-files.com/6648175f98e8b71e60b3e986/664ccb67504a0403838bc2d6_manhattan-new-york-chef-foodbuffet-x-webflow-template.jpg" alt="Manhattan Chef" />
                    <div className="space-y-8 row-1 col-span-2 lg:col-2">
                        <h2 className=" text-[72px] font-bold text-black font-serif">About us</h2>
                        <p className="text-gray-600 text-[18px] leading-relaxed">
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

                    </div>
                    <img className="lg:row-span-2  self-end w-full lg:h-[420px] h-[480px] z-20 object-cover relative rounded-lg" src="https://cdn.prod.website-files.com/6648175f98e8b71e60b3e986/664ccb67c1d31fa999787c13_delicious-sushi-foodbuffet-x-webflow-template.jpg" alt="Sushi Platter" />
                    <div className="space-y-2 row-3">
                        <p className="text-black  text-[28px]">Manhattan, New York</p>
                        <div className="flex items-center gap-4">
                            <p className="text-gray-500 text-[18px]">+1 (212) 857 - 0107</p>
                            <div className="w-px h-6 bg-gray-300"></div>
                            <p className="text-gray-500 text-[18px]">NEWYORK@FOODBUFFET.COM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )


}