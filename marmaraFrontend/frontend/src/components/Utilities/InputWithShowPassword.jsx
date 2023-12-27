import React from "react";
import ShowPassword from "./ShowPassword";
import { RegularInput } from "./Input";

function InputWithShowPassword({ setState, type, setInputType, invalid }) {
  return (
    <div className="relative">
      <RegularInput
        invalid={invalid}
        setState={setState}
        inputName="password"
        imageName="lock.png"
        darkImageName="lockDark.png"
        alt="Lock Icon"
        type={type}
        placeholder="Şifre"
      />
      <ShowPassword setInputType={setInputType} />
    </div>
  );
}

export default InputWithShowPassword;
