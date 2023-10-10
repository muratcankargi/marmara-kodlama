import React, { useEffect, useState } from "react";
import HamburgerMenu from "../Utilities/HamburgerMenu";
import Tags from "../Utilities/Tags";
import Cards from "../Utilities/Cards";
import { useWindowScrollPosition } from "../CustomHooks/useWindowScrollPosition";
import FullContainer from "../Utilities/FullContainer";
import { useLocationContext } from "../Contexts/LocationContext";
import { useAllFilters } from "../Contexts/AllFilters";

function FeedHeading({ text }) {
  return (
    <div className="w-24">
      <h1 className="text-3xl font-bold dark:text-neutral">{text}</h1>
    </div>
  );
}

// return (
//   <div
//     className={`
//     ${
//       // 200 random bi rakam değiştirilebilir
//       scrollY > 200
//         ? `bg-white dark:bg-darkPrimary top-0 sticky shadow-2xl
//         py-2 transition-[top] ease-in`
//         : "-mb-4"
//     }
//         z-30 relative py-3 flex`}
//   >
//     <FeedHeading text="İlanlar" />
//     <HamburgerMenu />
//   </div>
// );

function FeedNavbar() {
  // Bu kısımdaki transition olayı biraz yanlış kodlanmış gibi geliyor
  // doğrusunu yapana kadar bu şekilde kalabilir

  // Navbar'ın style'ını ne kadar scroll edildiğine
  // göre değiştiricez
  const { scrollY } = useWindowScrollPosition();

  // top property sini transition etmek için
  // scroll 200 den küçükken top: -5 yapıyoruz
  // görüntüsel olarak dengelemek içinde üstten boşluk bırakıyoruz margin top ile

  // grid ile centered container gibi gözükmesini sağlıyoruz hamburgermenu
  // aynı yerde olsun diyeuseLocation
  return (
    <div
      className={`w-full flex justify-center static h-14  transition-[top]
      ${
        scrollY > 200
          ? "z-50 sticky -top-[1px] bg-neutral dark:bg-darkPrimary shadow-2xl"
          : "-top-14"
      }`}
    >
      <div className="w-3/4 grid grid-cols-3 place-items-center">
        <div></div>
        <FeedHeading text="İlanlar" />
        <div className="place-self-end h-full flex items-center justify-center">
          <HamburgerMenu />
        </div>
      </div>
    </div>
  );
}

function AllFiltersContainer({ isActive, setIsActive }) {
  const handleClick = () => {
    setIsActive(false);
  };

  return (
    isActive && (
      <>
        <div className="w-full h-full fixed z-[999999] bottom-0 opacity-25 bg-black"></div>
        <div
          className={`${
            isActive ? "animate-showFilters" : ""
          } w-full transition-all fixed z-[99999999] bottom-0 dark:bg-darkNeutral bg-neutral rounded-tl-3xl rounded-tr-3xl border dark:border-darkPrimary `}
        >
          <div className="flex flex-col items-center">
            <div className="pt-8 w-full grid grid-cols-3 px-6">
              <div></div>
              <h2 className=" dark:text-neutral text-center text-black text-xl whitespace-nowrap">
                Tüm Filtreler
              </h2>
              <button
                onClick={handleClick}
                className="justify-self-end  before:block before:w-7 before:h-1 before:rounded-md before:bg-black dark:before:bg-neutral
          after:my-1 after:block after:w-7 after:h-1 after:rounded-md after:bg-black dark:after:bg-neutral
          before:rotate-45 after:-rotate-45 before:translate-y-2 "
              />
            </div>
          </div>
        </div>
      </>
    )
  );
}

// Bu sayfadaki bir şey overflow x yaratıyor
// Onu çözmemiz lazım bulamadım
function Feed() {
  const [tags, setTags] = useState([]);
  const { setLocation } = useLocationContext();
  const { isActive, setIsActive } = useAllFilters();

  useEffect(() => {
    setLocation("/anasayfa");
  }, []);

  return (
    <FullContainer paddingTop="pt-12">
      <AllFiltersContainer isActive={isActive} setIsActive={setIsActive} />
      <FeedNavbar />
      <Tags getTags={setTags} />
      <Cards />
    </FullContainer>
  );
}

export default Feed;
