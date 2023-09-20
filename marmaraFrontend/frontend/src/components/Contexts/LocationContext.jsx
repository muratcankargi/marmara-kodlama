import { createContext, useContext, useState, useEffect } from "react";

const LocationContext = createContext();

// hamburger menüde hangi sayfada olduğumuz belirtmek için burayı
// kulalnıcaz

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState("");

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
