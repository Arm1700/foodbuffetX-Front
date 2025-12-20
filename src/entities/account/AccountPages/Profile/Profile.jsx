import React from "react";
import { useProfile } from "../../../../context/ProfileContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { hy } from "date-fns/locale";
import { subYears } from "date-fns";



export default function Profile() {
  const { profile, updateField, saveProfile, loading, message, setMessage, error } = useProfile();

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{JSON.stringify(error)}</div>;
  if (!profile) return <div>No profile</div>;

  const minAgeDate = subYears(new Date(), 12);

  return (
    <div className="px-[3%] py-6">
      <h1 className="text-[#f93c22] text-2xl sm:text-[34px] font-bold mb-6">Պրոֆիլ</h1>

      <div className="rounded-2xl py-6">
        {/* Сообщение */}
        {message?.text && (
          <div
            className={`mb-4 text-center text-sm px-4 py-2 rounded-lg cursor-pointer ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
            onClick={() => setMessage({ text: "", type: "" })}
          >
            {message.text}
          </div>
        )}

        {/* Անուն */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Անուն</label>
          <input
            type="text"
            value={profile.first_name}
            onChange={(e) => updateField("first_name", e.target.value)}
            placeholder="Անուն"
            className="w-full border-2 py-2 sm:py-3 border-gray-200 rounded-xl px-3 sm:px-4 focus:outline-none focus:border-[#f93c22] transition text-sm sm:text-base"
          />
        </div>

        {/* Ազգանուն */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Ազգանուն</label>
          <input
            type="text"
            value={profile.last_name}
            onChange={(e) => updateField("last_name", e.target.value)}
            placeholder="Ազգանուն"
            className="w-full border-2 py-2 sm:py-3 border-gray-200 rounded-xl px-3 sm:px-4 focus:outline-none focus:border-[#f93c22] transition text-sm sm:text-base"
          />
        </div>
        
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Հեռախոսահամար</label>

          <PhoneInput
            country="am"
            enableSearch
            value={profile.phone_number}
            onChange={(value) => updateField("phone_number", "+" + value)}
            inputClass="!w-full !border-2 !border-gray-200 !rounded-xl !py-2 sm:!py-3 !pr-3 sm:!pr-4 !text-sm sm:!text-base"
          />

          {/* Мини-ошибка — мягкая */}
          {message?.type === "phone-error" && (
            <div className="text-red-600 text-sm mt-1">{message.text}</div>
          )}
        </div>



        {/* Ծննդյան ամսաթիվ */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Ծննդյան ամսաթիվ</label>

          <DatePicker
  selected={profile.birth_date}
  onChange={(date) => updateField("birth_date", date)}
  placeholderText="Ընտրեք ամսաթիվը"
  dateFormat="dd.MM.yyyy"
  locale={hy}
  maxDate={minAgeDate}   // 🔥 нельзя выбрать младше 12
  showYearDropdown
  scrollableYearDropdown
  yearDropdownItemNumber={100}
  className="w-full border-2 py-2 sm:py-3 border-gray-200 rounded-xl px-3 sm:px-4 focus:outline-none focus:border-[#f93c22]"
/>

        </div>


        {/* Button */}
        <button
          onClick={saveProfile}
          className="w-full sm:w-auto bg-[#f93c22] text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-[15px] shadow-md hover:bg-[#d8321b] transition mt-6 sm:mt-10 text-sm sm:text-base"
        >
          Պահպանել փոփոխությունները
        </button>
      </div>
    </div>
  );
}
