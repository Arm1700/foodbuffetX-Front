import { useState, useEffect } from "react";
import "../../index.css";
// import PersonData from "./AccountPages/PersonData/PersonData";
import { useAuth } from "../../hooks/useAuth";
import { accountArray } from "./accountArray";

function Account() {
  const { user, clearAuth } = useAuth();
  const isLoggedIn = !!user;

  const defaultPageForLoggedIn = accountArray.find(
    (item) => item.title === "📊 Ակնարկում"
  )?.id || 1;

  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    if (isLoggedIn) setActivePage(defaultPageForLoggedIn);
  }, [isLoggedIn]);

  const handleClick = (item) => {
    if (item.link === "/logout") {
      clearAuth();          
      setActivePage(1);   
      return;
    }
    setActivePage(item.id);
  };

  const filteredButtons = accountArray.filter((item) => {
    if (!isLoggedIn) return item.title === "Մուտք" || item.title === "Գրանցում";
    return item.title !== "Մուտք" && item.title !== "Գրանցում";
  });

  const activeItem = accountArray.find((item) => item.id === activePage);
  const Component = activeItem?.component ?? null;

  return (
    <div
      className="w-full h-[130vh] py-[5%] relative overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, #000000ff 0%, rgba(27, 27, 27, 1) 25%, rgba(32, 32, 32, 1) 50%, rgba(27, 27, 27, 1) 75%, #000000ff 100%)",
      }}
    >
      <div className="w-[55%] h-full mx-auto rounded-[20px] bg-white" style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.09)" }} >
        {/* Header */}
        <div
          className="w-full h-[17%] rounded-t-[17px] flex items-center justify-center flex-col gap-1"
          style={{
            background:
                "linear-gradient(90deg, #000000ff 0%, rgba(15, 15, 15, 1) 25%, rgba(26, 26, 26, 1) 50%, rgba(34, 34, 34, 1) 75%, #1b1b1bff 100%)",
          }}
        >
          <h1 className="text-[#f93c22] text-[36px] font-bold">Իմ պրոֆիլը</h1>
          <p className="text-[#F5F5F5]">
            Կառավարեք ձեր պրոֆիլը և պատվերները
          </p>
        </div>

        {/* Content */}
        <div className="w-full h-[83%] flex">

          {/* Sidebar */}
          <div className="w-[35%] h-full border-r-[1px] border-r-gray-200 flex flex-col items-center bg-[#F1F1F1] p-[5%] rounded-bl-[20px]">
            {/* {isLoggedIn && <PersonData />} */}
            <div
              className={`w-full flex flex-col gap-8 ${
                isLoggedIn ? "mt-[79%]" : "mt-[100%]"
              }`}
            >
              {filteredButtons.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item)}
                  className={`w-full py-[5%] text-start pl-[3%] font-bold text-[20px] rounded-[10px] transition ${
                    activePage === item.id
                      ? "bg-[#000000] text-[#F7F7F7]"
                      : "hover:bg-[#878787] hover:text-white"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="w-[65%] p-6 bg-[#FFFAFA]">
            {Component && <Component />}
          </div>
        </div>
      </div>

      {/* Background rings */}
      <img src="/rings/ringO.png" alt="" className="absolute right-[-11%] top-[-15%] max-w-[35%] max-h-[35%]" />
      <img src="/rings/ringO.png" alt="" className="absolute left-[-12%] bottom-[20%] max-w-[35%] max-h-[35%]" />
      <img src="/rings/ringO.png" alt="" className="absolute right-[-11%] bottom-[-15%] max-w-[35%] max-h-[35%]" />
    </div>
  );
}

export default Account;
