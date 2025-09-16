export default function () {
    return (
        <div>
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
                    <button className="bg-white border-2  absolute top-[619px] right-[1073px] text-[#292929] font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors duration-300 w-[145px] h-[55px] shine text-xs">
                        Browse Menu
                    </button>
                </div>
            </div>
        </div>
    )
}