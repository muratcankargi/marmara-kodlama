import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

// Dark mode u buradan kontrol ediyoruz default olarak
// "dark" veya "light girebiliriz."
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
