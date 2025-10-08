/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { accountArray } from "./accountArray";

const getFilteredButtons = (isLoggedIn) =>
  accountArray.filter((item) => {
    if (!isLoggedIn) return item.title === "Մուտք" || item.title === "Գրանցում";
    return item.title !== "Մուտք" && item.title !== "Գրանցում";
  });

export const getLastButton = (isLoggedIn) => {
  const filtered = getFilteredButtons(isLoggedIn);
  return filtered[filtered.length - 1];
};

export default function AccButton({ activePage, handleClick, isLoggedIn }) {
  const filteredButtons = getFilteredButtons(isLoggedIn);

  const buttons = isLoggedIn ? filteredButtons.slice(0, -1) : filteredButtons;
  const lastButton = isLoggedIn ? filteredButtons[filteredButtons.length - 1] : null;

  return (
    <div
      className={`
        w-full flex
        ${isLoggedIn ? "flex-col gap-4" : "flex-row gap-2 sm:flex-col sm:gap-4 sm:mt-[70%]"}
      `}
    >
      {buttons.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item)}
          className={`
            flex-1 py-2 px-2 sm:pl-3 rounded-[10px] font-bold text-[12px] sm:text-[15px] xl:text-lg transition
            ${isLoggedIn ? "text-start" : "text-center sm:text-start"}
            ${activePage === item.id ? "bg-black text-white" : "hover:bg-[#878787] hover:text-white"}
          `}
        >
          {item.title}
        </button>
      ))}

      {lastButton && (
        <button
          onClick={() => handleClick(lastButton)}
          className={`
            hidden sm:block w-full py-2 sm:py-3 sm:pl-3 rounded-[10px] font-bold text-[12px] sm:text-[15px] lg:text-lg transition
            text-start
            ${activePage === lastButton.id ? "bg-black text-white" : "hover:bg-[#878787] hover:text-white"}
          `}
        >
          {lastButton.title}
        </button>
      )}
    </div>
  );
}
