import React from "react";
import ShowPassword from "./ShowPassword";
import Input from "./Input";

function InputWithShowPassword({ setState, type, setInputType }) {
  return (
    <div className="relative">
      <Input
        setState={setState}
        inputName="password"
        src="/images/lock.png"
        alt="Lock Icon"
        type={type}
        placeholder="Şifre"
      />
      <ShowPassword setInputType={setInputType} />
    </div>
  );
}

export default InputWithShowPassword;
