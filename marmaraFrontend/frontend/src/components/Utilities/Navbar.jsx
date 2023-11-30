import ThemeSwitcher from "../Utilities/ThemeSwitcher";
import { useWindowScrollPosition } from "../CustomHooks/useWindowScrollPosition";
import HamburgerMenu from "../Utilities/HamburgerMenu";
import HamburgerMenuNavigation from "./HamburgerMenuNavigation";
import Logout from "./Logout";

function Heading({ text }) {
  return (
    <h1 className="text-3xl font-bold place-self-start self-center  dark:text-neutral">
      {text}
    </h1>
  );
}

export default function Navbar({ text }) {
  const { scrollY } = useWindowScrollPosition();

  return (
    <div
      className={`w-full flex justify-center static h-14  transition-[top]
        ${
          scrollY > 200
            ? "z-50 sticky -top-[1px] bg-neutral dark:bg-darkPrimary shadow-2xl"
            : "-top-14"
        }`}
    >
      <div className="w-full px-4 flex justify-between md:grid grid-cols-3 items-center place-items-center    ">
        <Heading text={text} />
        <ul className="md:flex gap-8  whitespace-nowrap hidden">
          <HamburgerMenuNavigation />
          <Logout />
        </ul>
        <div className="place-self-end self-center hidden md:flex">
          <ThemeSwitcher />
        </div>
        <HamburgerMenu />
      </div>
    </div>
  );
}
