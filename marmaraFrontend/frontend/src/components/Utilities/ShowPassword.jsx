import React, { useState } from "react";
import { useTheme } from "../Contexts/ThemeContext";

function ShowPassword({ setInputType }) {
  // Eye kapalı mı açık mı diye kontrol ediyoruz default olarak false yani eye-closed geliyor.
  const [eye, setEye] = useState(false);
  const { theme } = useTheme();

  // Eye basıldığı zaman inputun type ını değiştirerek
  // parolayı gösteriyoruz
  const changeType = () => {
    setEye((prevValue) => {
      return !prevValue;
    });
    setInputType((prevValue) => {
      return prevValue === "password" ? "text" : "password";
    });
  };

  return (
    <button
      className="absolute right-0 top-0 translate-y-[50%] w-6 h-6"
      onClick={changeType}
    >
      <img
        src={
          theme !== "dark"
            ? eye
              ? "images/eye.png"
              : "images/eye-closed.png"
            : eye
            ? "images/eyeDark.png"
            : "images/eye-closedDark.png"
        }
        alt="Show password"
      />
    </button>
  );
}

export default ShowPassword;
