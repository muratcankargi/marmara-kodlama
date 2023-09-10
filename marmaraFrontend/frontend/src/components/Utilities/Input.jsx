import React, { useEffect, useState } from "react";

function Input({ setState, inputName, src, alt, type, placeholder, invalid }) {
  const styles = {
    background: "none",
    width: "100%",
  };

  const handleOnChange = (e) => {
    setState((prevValue) => ({
      ...prevValue,
      [inputName]: e.target.value,
    }));
  };

  // shake animasyonunu hangi inputa ekleyeceğimizi belirlemek için
  // invalid.inputName'i gönderiyoruz props olarak
  // invalid.value useValidate sayfasında true veya false olarak belirleniyor
  return (
    <>
      <div
        className={`${
          invalid.inputName === inputName && invalid.value && "animate-shake"
        } mt-12 w-full flex border-2 border-b-slate-300 border-x-0 border-t-0 p-2 pl-0 `}
      >
        <img className="w-6 h-6" src={src} alt={alt} />
        <input
          onChange={handleOnChange}
          className="pl-2 w-3/4 outline-0 border-0  "
          style={type === "Date" ? styles : {}}
          type={type}
          placeholder={placeholder}
          required
        />
      </div>
      <span className="text-xs text-red-500">
        {invalid.inputName === inputName && invalid?.message}
      </span>
    </>
  );
}

export default Input;
