import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Utilities/Input";
import IntroText from "../Utilities/IntroText";
import CustomLink from "../RouteRelated/CustomLink";
import Button from "../Utilities/Button";
import CenteredContainer from "../Utilities/CenteredContainer";
import InputWithShowPassword from "../Utilities/InputWithShowPassword";

function useUserInfo() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  return [userInfo, setUserInfo];
}

function CustomLinkContainer() {
  return (
    <div className="flex w-full justify-between items-center mt-6">
      <CustomLink to="/signup" text="Kayıt Ol" />
      <CustomLink text="Şifremi Unuttum" />
    </div>
  );
}

function Inputs({ setUserInfo }) {
  const [inputType, setInputType] = useState("password");

  return (
    <>
      <Input
        setState={setUserInfo}
        about="email"
        src="/images/mailIcon.png"
        alt="Mail Icon"
        type="Email"
        placeholder="Email"
      />
      <InputWithShowPassword
        setState={setUserInfo}
        type={inputType}
        setInputType={setInputType}
      />
    </>
  );
}

function ButtonContainer() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="absolute bottom-12 left-0 right-0  w-full flex justify-center items-center ">
      <Button onClickFunction={handleClick} text="Giriş Yap" />
    </div>
  );
}

function SignInPage() {
  const [userInfo, setUserInfo] = useUserInfo();

  return (
    <CenteredContainer>
      <IntroText
        mainText="Tekrar hoş geldiniz"
        fadedText="Marmara kayıp eşya ağı"
      />
      <Inputs setUserInfo={setUserInfo} />
      <CustomLinkContainer />
      <ButtonContainer />
    </CenteredContainer>
  );
}

export default SignInPage;
