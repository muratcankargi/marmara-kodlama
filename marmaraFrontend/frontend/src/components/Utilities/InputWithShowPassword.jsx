import React from "react";
import ShowPassword from "./ShowPassword";
import Input from "./Input";

function InputWithShowPassword({ setState, type, setInputType, invalid }) {
  return (
    <div className="relative">
      <Input
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
