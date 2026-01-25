import React from "react";
import { useProfile } from "../../../../context/ProfileContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enUS } from "date-fns/locale";
import { subYears } from "date-fns";

export default function Profile() {
  const { profile, updateField, saveProfile, loading, message, setMessage, error } =
    useProfile();

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{JSON.stringify(error)}</div>;
  if (!profile) return <div>No profile</div>;

  const minAgeDate = subYears(new Date(), 12);

  return (
    <div className="px-[3%] py-6">
      <h1 className="text-[#f93c22] text-2xl sm:text-[34px] font-bold mb-6">
        Profile
      </h1>

      <div className="rounded-2xl py-6">
        {/* Message */}
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

        {/* First Name */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            First Name
          </label>
          <input
            type="text"
            value={profile.first_name}
            onChange={(e) => updateField("first_name", e.target.value)}
            className="w-full border-2 py-3 border-gray-200 rounded-xl px-4 focus:outline-none focus:border-[#f93c22]"
          />
        </div>

        {/* Last Name */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={profile.last_name}
            onChange={(e) => updateField("last_name", e.target.value)}
            className="w-full border-2 py-3 border-gray-200 rounded-xl px-4 focus:outline-none focus:border-[#f93c22]"
          />
        </div>

        {/* Phone */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Phone Number
          </label>
          <PhoneInput
            country="am"
            value={profile.phone_number}
            onChange={(phone) =>
              updateField("phone_number", phone || "")
            }
            inputStyle={{
              width: "100%",
              borderRadius: "12px",
              border: "2px solid #e5e7eb",
              height: "48px",
            }}
            buttonStyle={{
              border: "2px solid #e5e7eb",
              borderRight: "none",
              borderRadius: "12px 0 0 12px",
            }}
          />
        </div>

        {/* Birth Date */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Birth Date
          </label>
          <DatePicker
            selected={profile.birth_date}
            onChange={(date) => updateField("birth_date", date)}
            placeholderText="Select date"
            dateFormat="MM/dd/yyyy"
            locale={enUS}
            maxDate={minAgeDate}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            className="w-full border-2 py-3 border-gray-200 rounded-xl px-4 focus:outline-none focus:border-[#f93c22]"
          />
        </div>

        {/* Save */}
        <button
          onClick={saveProfile}
          className="bg-[#f93c22] text-white font-bold px-6 py-3 rounded-[15px] hover:bg-[#d8321b] transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
