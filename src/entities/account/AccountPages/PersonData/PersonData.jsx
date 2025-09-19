

export default function PersonData() {
  return (
    <div className="rounded-2xl py-6 w-full mb-6">
      <div className="flex flex-col justify-center items-center gap-4">
        {/* Avatar */}
        <div className="w-[150px] h-[150px] rounded-full flex items-center justify-center text-white text-4xl font-bold bg-gradient-to-r from-[#000000] to-[#3B3B3B]">
          ԱԻ
        </div>

        {/* Name & email */}
        <div>
          <h2 className="font-bold text-center">Ալեքսանդր Իվանով</h2>
          <p className="opacity-90 text-[12px] text-center">alex@example.com</p>
        </div>
      </div>
    </div>
  );
}
