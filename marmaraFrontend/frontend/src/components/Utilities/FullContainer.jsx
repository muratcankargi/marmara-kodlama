import React from "react";
import { useHamburgerMenu } from "../Contexts/HamburgerMenuContext";

// centeredcontainer in bir başka versiyonu
function FullContainer({ children, paddingTop = "" }) {
  // bu yolla yaptığımız zaman hamburgermenu yu kapattığımızda
  // en yukarı atıyor ekranı
  // kullanıcının nerede kaldığını alabiliriz öncesinde veya
  // başka bi çözüm üretebiliriz
  const { isActive } = useHamburgerMenu();

  return (
    <div
      className={`${paddingTop} ${
        isActive ? "max-h-screen overflow-y-hidden" : "min-h-screen"
      } bg-neutral dark:bg-darkNeutral `}
    >
      <div>{children}</div>
    </div>
  );
}

export default FullContainer;
