import React from "react";
import { useProfile } from "../../../../context/ProfileContext";

export default function PersonData() {
  const { profile } = useProfile();

  // Если нет профиля — показываем заглушку
  const firstName = profile?.first_name || "?";
  const lastName = profile?.last_name || "?";
  const email = profile?.email || "?@?.com";

  const initials = `${firstName[0]}${lastName[0]}`;

  return (
    <div className="rounded-2xl py-6 w-full mb-6">
      <div className="flex flex-col justify-center items-center gap-4">
        {/* Avatar */}
        <div className="w-[150px] h-[150px] rounded-full flex items-center justify-center text-white text-4xl font-bold bg-gradient-to-r from-[#000000] to-[#3B3B3B]">
          {initials}
        </div>

        {/* Name & email */}
        <div>
          <h2 className="font-bold text-center">{firstName} {lastName}</h2>
          <p className="opacity-90 text-[12px] text-center">{email}</p>
        </div>
      </div>
    </div>
  );
}
