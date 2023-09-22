import React, { useEffect, useState } from "react";
import { useTheme } from "../Contexts/ThemeContext";

function Image({ imageName, darkImageName, className, alt = "Image" }) {
  const { theme } = useTheme();

  // Theme'e göre image yolunu değiştiriyoruz
  const getCorrectImagePath = () => {
    return theme === "dark" ? darkImageName : imageName;
  };

  const [imageToShow, setImageToShow] = useState(getCorrectImagePath());

  useEffect(() => {
    setImageToShow(getCorrectImagePath());
  }, [theme]);

  return <img className={className} src={`/images/${imageToShow}`} alt={alt} />;
}

export default Image;
