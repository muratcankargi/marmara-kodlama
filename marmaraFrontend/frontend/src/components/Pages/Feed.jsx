import React, { useEffect, useState } from "react";
import HamburgerMenu from "../Utilities/HamburgerMenu";
import Tags from "../Utilities/Tags";
import Cards from "../Utilities/Cards";
import { useWindowScrollPosition } from "../CustomHooks/useWindowScrollPosition";
import FullContainer from "../Utilities/FullContainer";
import { useLocationContext } from "../Contexts/LocationContext";
import { useAllFilters } from "../Contexts/AllFilters";
import AllFiltersContainer from "../AllFilters/AllFiltersContainer";
import Image from "../Utilities/Image";
import { useSearchParams } from "react-router-dom";

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
  // aynı yerde olsun diye useLocation
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

function ClearFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const isFilterApplied = searchParams.get("isApply");

  const handleClick = () => {
    // Create a new URLSearchParams object
    const newSearchParams = new URLSearchParams(searchParams);

    // Delete all parameters
    for (const param of searchParams.entries()) {
      newSearchParams.delete(param[0]);
    }

    // Update the state with the new parameters
    setSearchParams(newSearchParams);
  };

  return (
    isFilterApplied && (
      <div
        className="px-3 pt-3 text-neutral
  "
      >
        <button
          onClick={handleClick}
          className="bg-accent relative  p-1 rounded-sm px-2"
        >
          <div className="flex gap-1 items-center">
            {/* <Image
          className=" w-4 aspect-square  h-4"
          imageName="trash.png"
          darkImageName="trash.png"
          alt="filtreleri temizle"
        /> */}
            <div className="font-semibold ">Filtreleri Temizle</div>
          </div>
        </button>
      </div>
    )
  );
}

function Feed() {
  const [tags, setTags] = useState([]);
  const { setLocation } = useLocationContext();
  const { isActive, setIsActive } = useAllFilters();

  useEffect(() => {
    setLocation("/anasayfa");
  }, []);

  return (
    <FullContainer paddingTop="pt-12">
      <FeedNavbar />
      <Tags getTags={setTags} />
      <AllFiltersContainer isActive={isActive} setIsActive={setIsActive} />
      <ClearFilters />
      <Cards tags={tags} />
    </FullContainer>
  );
}

export default Feed;
