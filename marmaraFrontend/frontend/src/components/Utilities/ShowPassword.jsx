import React, { useState } from "react";

function ShowPassword({ setInputType }) {
  // Eye kapalı mı açık mı diye kontrol ediyoruz default olarak false yani eye-closed geliyor.
  const [eye, setEye] = useState(false);

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
        src={eye ? "images/eye.png" : "images/eye-closed.png"}
        alt="Show password"
      />
    </button>
  );
}

export default ShowPassword;
