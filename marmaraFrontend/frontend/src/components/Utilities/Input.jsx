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

  // createdeclaration da textarea kullandığımız için burası baya karıştı
  // biraz daha sadeleştirmeye çalışabiliriz.

  // shake animasyonunu hangi inputa ekleyeceğimizi belirlemek için
  // invalid.inputName'i gönderiyoruz props olarak
  // invalid.value useValidate sayfasında true veya false olarak belirleniyor
  return (
    <>
      <div
        className={`
        
        ${
          invalid.inputName === inputName && invalid.value && "animate-shake"
        } ${
          type !== "textarea"
            ? "mt-12 w-full flex border-2 border-b-slate-300 border-x-0 border-t-0 p-2 pl-0"
            : "mt-12 w-full border-2 border-slate-300 rounded-md p-2 "
        } `}
      >
        {type !== "textarea" ? (
          <>
            <img className="w-6 h-6" src={src} alt={alt} />
            <input
              onChange={handleOnChange}
              className="pl-2 w-3/4 outline-0 border-0 dark:bg-darkNeutral dark:text-neutral"
              style={type === "Date" ? styles : {}}
              type={type}
              placeholder={placeholder}
              required
            />
          </>
        ) : (
          <textarea
            className="w-full resize-none outline-0 border-0 dark:bg-darkNeutral dark:text-neutral"
            onChange={handleOnChange}
            type={type}
            rows="10"
            placeholder={placeholder}
            required
          />
        )}
      </div>
      <span className="text-xs text-red-500">
        {invalid.inputName === inputName && invalid?.message}
      </span>
    </>
  );
}

export default Input;
