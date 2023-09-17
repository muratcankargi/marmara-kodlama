import React from "react";
import HamburgerMenu from "../Utilities/HamburgerMenu";
import Tags from "../Utilities/Tags";
import Cards from "../Utilities/Cards";
import { useWindowScrollPosition } from "../CustomHooks/useWindowScrollPosition";

function FeedHeading({ text }) {
  return (
    <div className="w-full flex justify-center items-center  ">
      <h1 className="text-3xl font-bold dark:text-neutral">{text}</h1>
    </div>
  );
}

function FeedNavbar() {
  // Navbar'ın style'ını ne kadar scroll edildiğine
  // göre değiştiricez
  const { scrollY } = useWindowScrollPosition();
  console.log(scrollY);

  return (
    <div
      className={`${
        scrollY > 50 && "bg-white dark:bg-[#1B2430]  shadow-xl py-2"
      } z-30 sticky top-0  `}
    >
      <FeedHeading text="İlanlar" />
      <HamburgerMenu />
    </div>
  );
}

// Bu sayfadaki bir şey overflow x yaratıyor
// Onu çözmemiz lazım bulamadım
function Feed() {
  return (
    <div className="w-full pt-4  bg-neutral dark:bg-[#10141A]">
      <FeedNavbar />
      <Tags />
      <Cards />
    </div>
  );
}

export default Feed;
