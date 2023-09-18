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
  // Bu kısımdaki transition olayı biraz yanlış kodlanmış gibi geliyor
  // doğrusunu yapana kadar bu şekilde kalabilir

  // Navbar'ın style'ını ne kadar scroll edildiğine
  // göre değiştiricez
  const { scrollY } = useWindowScrollPosition();

  // top property sini transition etmek için
  // scroll 200 den küçükken top: -5 yapıyoruz
  // görüntüsel olarak dengelemek içinde üstten boşluk bırakıyoruz margin top ile
  return (
    <div
      className={`
      ${
        // 200 random bi rakam değiştirilebilir
        scrollY > 200
          ? `bg-white dark:bg-darkPrimary top-0 sticky shadow-2xl py-2 transition-[top]  ease-in`
          : "-top-5 mt-10"
      } 
          z-30 relative`}
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
    <div className="w-full pt-4  bg-neutral dark:bg-darkNeutral">
      <FeedNavbar />
      <Tags />
      <Cards />
    </div>
  );
}

export default Feed;
