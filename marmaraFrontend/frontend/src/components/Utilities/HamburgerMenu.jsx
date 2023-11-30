import { React, useEffect, useState } from "react";
import Logout from "./Logout";
import ThemeSwitcher from "./ThemeSwitcher";
import HamburgerMenuNavigation from "./HamburgerMenuNavigation";
import disableScroll from "disable-scroll";

function HamburgerMenuButton({ showMenu, setShowMenu }) {
  const handleClick = () => {
    setShowMenu((prevValue) => {
      return !prevValue;
    });
  };

  return (
    <button
      // burada z-50 kullandık ama z-index kullanmak için position vermemiz
      // veya flex bir container in içerisinde olması lazım
      // 2. yolu seçiyoruz ve hamburgermenu kullanacağımız yerlerde
      // bu componenti flex bir containerin içine koyuyoruz
      className={`z-50 
          before:my-1 before:block before:w-8 before:h-1 before:rounded-md before:bg-black dark:before:bg-neutral
          after:my-1 after:block after:w-8 after:h-1 after:rounded-md after:bg-black dark:after:bg-neutral
          before:transition-all after:transition-all md:hidden
          ${
            showMenu &&
            " before:rotate-45 after:-rotate-45 before:translate-y-2 pb-2 "
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
               transition-all duration-300 md:hidden 
           h-screen bg-neutral dark:bg-darkNeutral touch-none`}
    >
      <HamburgerMenuNavigation />
      <Logout />
      <ThemeSwitcher />
    </div>
  );
}

function HamburgerMenu() {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showMenu) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }
  }, [showMenu]);

  return (
    <>
      <HamburgerMenuButton showMenu={showMenu} setShowMenu={setShowMenu} />
      <HamburgerMenuContent showMenu={showMenu} />
    </>
  );
}

export default HamburgerMenu;
