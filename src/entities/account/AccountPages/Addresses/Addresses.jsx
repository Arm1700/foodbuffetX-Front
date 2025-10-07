import { useState, useEffect } from "react";
import { getAddresses, addAddress as addAddressAPI, deleteAddress } from "../../../..//shared/api/auth";

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    async function fetchAddresses() {
      try {
        const data = await getAddresses();
        setAddresses(data);
      } catch (err) {
        console.error("Failed to load addresses:", err);
      }
    }
    fetchAddresses();
  }, []);

  const addAddress = async () => {
    if (!newAddress.trim()) return;
    try {
      const added = await addAddressAPI(newAddress);
      setAddresses((prev) => [...prev, added]);
      setNewAddress("");
    } catch (err) {
      console.error("Failed to add address:", err);
    }
  };

  const removeAddress = async (id) => {
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    } catch (err) {
      console.error("Failed to delete address:", err);
    }
  };

  return (
    <div className="px-[3%] py-6 h-full flex flex-col">
      <h1 className="text-[#f93c22] text-2xl sm:text-[34px] font-bold mb-6">Հասցեներ</h1>

      {/* Addresses */}
      <div className="flex-1 overflow-y-auto max-h-[300px] pr-2 mb-6 space-y-4 custom-scrollbar">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="bg-white border rounded-xl shadow p-4 sm:p-5 flex justify-between items-center hover:shadow-lg transition"
          >
            <div>
              <div className="font-semibold text-[#f93c22] text-sm sm:text-base">{addr.label}</div>
              <div className="text-gray-600 text-xs sm:text-sm">{addr.address}</div>
            </div>
            <button
              onClick={() => removeAddress(addr.id)}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Հեռացնել
            </button>
          </div>
        ))}
        {addresses.length === 0 && (
          <p className="text-gray-500 text-sm sm:text-base">Դուք դեռ հասցե չեք ավելացրել։</p>
        )}
      </div>

      {/* New addresses */}
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-sm sm:text-base">Նոր հասցեներ</h1>
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="Մուտքագրեք հասցե"
          className="w-full sm:w-2/3 md:w-1/2 lg:w-[40%] border rounded-lg px-3 py-2 text-sm sm:text-base"
        />
        <button
          onClick={addAddress}
          className="w-full sm:w-2/3 md:w-1/2 lg:w-[40%] py-2 bg-[#f93c22] text-white rounded-xl hover:bg-[#e2331d] transition text-sm sm:text-base"
        >
          Ավելացնել հասցե
        </button>
      </div>

      {/* CSS for custom scroll */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #ffe5df;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #f93c22, #ff724f);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #e2331d, #ff5c3a);
        }
      `}</style>
    </div>
  );
}
