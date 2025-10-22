import { useState, useEffect } from "react";
import "../../index.css";
import PersonData from "./AccountPages/PersonData/PersonData";
import { useAuth } from "../../hooks/useAuth";
import { accountArray } from "./accountArray";
import AccButton, { getLastButton } from "./AccButton";

function Account() {
  const { user, clearAuth } = useAuth();
  const isLoggedIn = !!user;

  const defaultPageForLoggedIn = accountArray.find(
    (item) => item.title === "📊 Ակնարկում"
  )?.id || 1;

  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    if (isLoggedIn) setActivePage(defaultPageForLoggedIn);
  }, [isLoggedIn, defaultPageForLoggedIn]);

  const handleClick = (item) => {
    if (item.link === "/logout") {
      clearAuth();          
      setActivePage(1);   
      return;
    }
    setActivePage(item.id);
  };

  const activeItem = accountArray.find((item) => item.id === activePage);
  const Component = activeItem?.component ?? null;

  const lastButton = getLastButton(isLoggedIn);

  return (
    <div className="w-full min-h-screen py-[23%] sm:py-[17%] md:py-[15%] mdlg:py-[13%] lg:py-[11%] lgg:py-[9%] xl:py-[7%] 2xl:py-[5%] relative overflow-hidden bg-gradient-to-r from-black via-[#1b1b1b] to-black">
      <div className=" w-full minsm:w-[100%] sm:w-[95%] md:w-[80%] mdlg:w-[70%] lg:w-[67%] 2xl:w-[50%] sm:h-auto md:h-[750px] lgg:h-[930px] xl:h-[800px] mx-auto rounded-[20px] bg-white shadow-md flex flex-col " >
        {/* Header */}
        <div className=" w-full h-[120px] sm:h-[140px] lg:h-[150px] rounded-t-[17px] flex items-center justify-center flex-col gap-1 bg-gradient-to-r from-black via-[#1a1a1a] to-[#1b1b1b] " >
          <h1 className="text-[#f93c22] text-[24px] sm:text-[30px] lg:text-[36px] font-bold">
            Իմ պրոֆիլը
          </h1>
          <p className="text-[#F5F5F5] text-sm sm:text-base">
            Կառավարեք ձեր պրոֆիլը և պատվերները
          </p>
        </div>

        {/* Content */}
        <div className="w-full sm:flex  lg:h-[90%]">
          {/* Sidebar */}
          <div className="w-full sm:w-[40%] lgg:w-[35%] p-6 lg:p-[5%] border-r border-gray-200 flex flex-row sm:flex-col items-start gap-6 bg-[#F1F1F1] sm:rounded-bl-[20px]">
            {isLoggedIn ? (
              <>
                <div className="w-[50%] h-full sm:w-full sm:order-2">
                  <AccButton
                    activePage={activePage}
                    handleClick={handleClick}
                    isLoggedIn={isLoggedIn}
                  />
                </div>

                <div className="w-[50%] h-[40%] sm:w-full sm:order-1">
                  <PersonData />

                  {lastButton && (
                    <button
                      onClick={() => handleClick(lastButton)}
                      className={`w-full py-2 pr-2 font-bold text-[14px] md:text-lg sm:text-xl rounded-[10px] transition sm:hidden
                        ${activePage === lastButton.id ? "bg-black text-white" : "hover:bg-[#878787] hover:text-white"}`}
                    >
                      {lastButton.title}
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="w-[100%] sm:gap-4">
                <AccButton
                  activePage={activePage}
                  handleClick={handleClick}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            )}
          </div>


          {/* Main content */}
          <div className="w-full sm:w-[60%] lg:w-[65%] p-4 sm:p-6 bg-[#FFFAFA] sm:rounded-br-[20px]">
            {Component && <Component />}
          </div>
        </div>
      </div>

      <img src="/rings/ringO.png" alt="" className="hidden lg:block absolute right-[-11%] top-[-15%] max-w-[25%]" />
      <img src="/rings/ringO.png" alt="" className="hidden lg:block absolute left-[-12%] bottom-[20%] max-w-[25%]" />
      <img src="/rings/ringO.png" alt="" className="hidden lg:block absolute right-[-11%] bottom-[-15%] max-w-[25%]" />
    </div>
  );
}

export default Account;
