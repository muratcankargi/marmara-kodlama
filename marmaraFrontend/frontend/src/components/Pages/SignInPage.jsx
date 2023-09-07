import React, { useState } from "react";
import Input from "../Utilities/Input";
import IntroText from "../Utilities/IntroText";
import CustomLink from "../RouteRelated/CustomLink";
import Button from "../Utilities/Button";
import { useNavigate } from "react-router-dom";
import CenteredContainer from "../Utilities/CenteredContainer";
import ShowPassword from "../Utilities/ShowPassword";

function SignInPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [inputType, setInputType] = useState("password");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/createprofile");
  };

  return (
    <CenteredContainer>
      <IntroText
        mainText="Tekrar hoş geldiniz"
        fadedText="Marmara kayıp eşya ağı"
      />
      <Input
        setState={setUserInfo}
        about="email"
        src="/images/mailIcon.png"
        alt="Mail Icon"
        type="Email"
        placeholder="Email"
      />
      <div className="relative">
        <Input
          setState={setUserInfo}
          about="password"
          src="/images/lock.png"
          alt="Password Icon"
          type={inputType}
          placeholder="Şifre"
        />
        <ShowPassword setInputType={setInputType} />
      </div>
      <div className="flex w-full justify-between items-center mt-6">
        <CustomLink to="/signup" text="Kayıt Ol" />
        <CustomLink text="Şifremi Unuttum" />
      </div>
      <div className="absolute bottom-12 left-0 right-0  w-full flex justify-center items-center ">
        <Button onClickFunction={handleClick} text="Giriş Yap" />
      </div>
    </CenteredContainer>
  );
}

export default SignInPage;
