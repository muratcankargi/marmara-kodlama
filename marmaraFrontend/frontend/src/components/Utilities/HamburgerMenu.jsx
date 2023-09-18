import { React, useState } from "react";
import Logout from "./Logout";
import ThemeSwitcher from "./ThemeSwitcher";
import { useNavigate } from "react-router-dom";
import HamburgerMenuNavigation from "./HamburgerMenuNavigation";

function HamburgerMenuButton({ showMenu, setShowMenu }) {
  const handleClick = () => {
    setShowMenu((prevValue) => {
      return !prevValue;
    });
  };

  // after ve before hamburgermenu iconunu oluşturmak
  // için kullanıldı
  return (
    <button
      className={` z-50 absolute top-0 bottom-0 right-5
          before:my-1 before:block before:w-8 before:h-1 before:rounded-md before:bg-black dark:before:bg-neutral
          after:my-1 after:block after:w-8 after:h-1 after:rounded-md after:bg-black dark:after:bg-neutral
          before:transition-all after:transition-all
          ${
            showMenu &&
            " before:rotate-45 after:-rotate-45 before:translate-y-2 "
          }`}
      onClick={handleClick}
    >
      {!showMenu && (
        <div className="w-8 h-1 rounded-md bg-black dark:bg-neutral"></div>
      )}
    </button>
  );
}

function HamburgerMenuContent({ showMenu }) {
  return (
    <div
      className={`${showMenu ? "translate-x-0" : "translate-x-full"} 
              flex flex-col justify-center items-center gap-12 
              z-40 top-0 right-0 fixed w-screen  
               transition-all duration-300
           h-screen bg-neutral dark:bg-darkNeutral`}
    >
      <HamburgerMenuNavigation />
      <ThemeSwitcher />
      <Logout />
    </div>
  );
}

function HamburgerMenu() {
  // hamburger menüyü kontrol ediyor
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <HamburgerMenuButton showMenu={showMenu} setShowMenu={setShowMenu} />
      <HamburgerMenuContent showMenu={showMenu} />
    </>
  );
}

export default HamburgerMenu;
