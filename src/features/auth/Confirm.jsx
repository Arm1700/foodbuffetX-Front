import React from "react";

export default function Confirm({ confirmOpen, setConfirmOpen, handleSubmit }) {
  if (!confirmOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000ab] flex items-center justify-center z-50 mx-auto h-full">
      <div className="bg-[#181818] text-white p-6 rounded-xl shadow-lg w-11/12 max-w-sm text-center mb-[15%]">
        <p className="mb-4 text-lg">Համոզվա՞ծ եք, որ դա ձեր համարն է:</p>
        <div className="flex justify-around">
          <button onClick={handleSubmit} className="px-4 py-2 bg-[#ff692e] text-white rounded-xl hover:bg-[#9c411d]" >
            Այո
          </button>
          <button onClick={() => setConfirmOpen(false)} className="w-[15%] bg-red-800 text-white rounded-xl hover:bg-[#770000]" >
            Ոչ
          </button>
        </div>
      </div>
    </div>
  );
}
