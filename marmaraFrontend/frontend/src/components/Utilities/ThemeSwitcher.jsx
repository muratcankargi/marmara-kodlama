import { useTheme } from "../Contexts/ThemeContext";
import ThemeIcons from "./ThemeIcons";

// Theme değiştirmek için kullanılan bir button
function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme((prevValue) => {
      return prevValue === "dark" ? "light" : "dark";
    });
  };

  return (
    <button onClick={handleClick}>
      {theme === "dark" ? (
        <ThemeIcons icon="light" />
      ) : (
        <ThemeIcons icon="dark" />
      )}
    </button>
  );
}

export default ThemeSwitcher;
