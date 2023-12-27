import React, { useEffect, useState } from "react";
import { useTheme } from "../Contexts/ThemeContext";
import Image from "./Image";

function ErrorMessage({ invalid, inputName }) {
  return (
    <span className="text-xs text-red-500">
      {invalid.inputName === inputName && invalid?.message}
    </span>
  );
}

export function Textarea({ invalid, inputName, placeholder, setState }) {
  const handleOnChange = (e) => {
    setState((prevValue) => ({
      ...prevValue,
      [inputName]: e.target.value,
    }));
  };

  const isInvalid = invalid.inputName === inputName && invalid.value;

  return (
    <div>
      <div
        className={`${isInvalid && "animate-shake"} 
        w-full border-2 border-slate-300 dark:border-darkPrimary rounded-md p-2`}
      >
        <textarea
          className="w-full resize-none outline-0 border-0 bg-transparent dark:text-neutral"
          onChange={handleOnChange}
          type="textarea"
          rows="10"
          placeholder={placeholder}
          required
        />
      </div>
      <ErrorMessage invalid={invalid} inputName={inputName} />
    </div>
  );
}

// shake animasyonunu hangi inputa ekleyeceğimizi belirlemek için
// invalid.inputName'i gönderiyoruz props olarak
// invalid.value useValidate sayfasında true veya false olarak belirleniyor
export function RegularInput({
  imageName,
  darkImageName,
  alt,
  type,
  placeholder,
  setState,
  inputName,
  invalid,
}) {
  const handleOnChange = (e) => {
    setState((prevValue) => ({
      ...prevValue,
      [inputName]: e.target.value,
    }));
  };

  const styles = {
    background: "none",
    width: "100%",
  };

  const isInvalid = invalid.inputName === inputName && invalid.value;

  return (
    <div>
      <div
        className={`${isInvalid && "animate-shake"} 
         w-full flex border-2 border-b-slate-300 dark:border-b-darkPrimary 
         border-x-0 border-t-0 p-2 pl-0 `}
      >
        <Image
          className="w-6 h-6"
          imageName={imageName}
          darkImageName={darkImageName}
          alt={alt}
        />
        <input
          onChange={handleOnChange}
          className="pl-2 w-full outline-0 border-0 bg-transparent dark:text-neutral"
          style={type === "Date" ? styles : {}}
          type={type}
          placeholder={placeholder}
          required
        />
      </div>
      <ErrorMessage invalid={invalid} inputName={inputName} />
    </div>
  );
}
