import React, { useEffect, useState } from "react";
import HamburgerMenu from "../Utilities/HamburgerMenu";
import Tags from "../Utilities/Tags";
import Cards from "../Utilities/Cards";
import { useWindowScrollPosition } from "../CustomHooks/useWindowScrollPosition";
import FullContainer from "../Utilities/FullContainer";

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
  // aynı yerde olsun diye
  return (
    <div
      className={`w-full flex justify-center static h-14 transition-[top]
      ${
        scrollY > 200
          ? "z-50 sticky top-0 bg-neutral dark:bg-darkPrimary"
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

// Bu sayfadaki bir şey overflow x yaratıyor
// Onu çözmemiz lazım bulamadım
function Feed() {
  const [tags, setTags] = useState([]);

  return (
    <FullContainer paddingTop="pt-12">
      <FeedNavbar />
      <Tags getTags={setTags} />
      <Cards />
    </FullContainer>
  );
}

export default Feed;
