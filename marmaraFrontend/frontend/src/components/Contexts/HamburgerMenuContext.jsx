import { createContext, useContext, useState } from "react";

const HamburgerMenuContext = createContext();

export const HamburgerMenuProvider = ({ children }) => {
  // hambrugermenu active ise sağdaki scroll u kaldırıyoruz yoksa
  // kapatma butonu yerinden oynuyor
  const [isActive, setIsActive] = useState("");

  return (
    <HamburgerMenuContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </HamburgerMenuContext.Provider>
  );
};

export const useHamburgerMenu = () => useContext(HamburgerMenuContext);
