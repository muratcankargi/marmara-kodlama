import { createContext, useContext, useState, useEffect } from "react";

const AllFiltersContext = createContext();

export const AllFiltersProvider = ({ children }) => {
  // hambrugermenu active ise sağdaki scroll u kaldırıyoruz yoksa
  // kapatma butonu yerinden oynuyor
  const [isActive, setIsActive] = useState(false);

  return (
    <AllFiltersContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </AllFiltersContext.Provider>
  );
};

export const useAllFilters = () => useContext(AllFiltersContext);
