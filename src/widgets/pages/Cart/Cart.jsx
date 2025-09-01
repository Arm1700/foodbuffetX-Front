export default function Cart() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 ">
      <div className="bg-white w-96 p-6 rounded-xl  py-25">
        {/* Header */}
        <div className="flex justify-between  border-b pb-3">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button className="text-gray-500 hover:text-black text-xl">✕</button>
        </div>

        {/* Body */}
        <div className="py-8 text-center text-gray-500">
          No items found.
        </div>

        {/* Footer */}
        <button className="w-full bg-[#f93c22] text-white py-4 ">
          BROWSE MENU
        </button>
      </div>
    </div>
  );
}