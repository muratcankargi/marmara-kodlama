import React, { useEffect } from "react";
import { useHamburgerMenu } from "../Contexts/HamburgerMenuContext";
import { useAllFilters } from "../Contexts/AllFilters";
import disableScroll from "disable-scroll";

// centeredcontainer in bir başka versiyonu
function FullContainer({ children, paddingTop = "" }) {
  // bu yolla yaptığımız zaman hamburgermenu yu kapattığımızda
  // en yukarı atıyor ekranı
  // kullanıcının nerede kaldığını alabiliriz öncesinde veya
  // başka bi çözüm üretebiliriz
  const { isActive } = useHamburgerMenu();

  if (isActive) {
    disableScroll.on();
  } else {
    disableScroll.off();
  }

  // menu transition ile geldiği için feed'de yeterince card yokken
  // alt tarafta bi beyazlık oluşuyor onu engellemek için isActive'i
  // timeout ile transition süresine eşitleyebiliriz ama çok yamama oluyor
  // bu menü açıkken scroll yapamama olayını başka şekillerde çözmemiz lazım
  return (
    <div
      className={`${paddingTop} min-h-screen bg-neutral dark:bg-darkNeutral `}
    >
      <div>{children}</div>
    </div>
  );
}

export default FullContainer;
