import React, { useState } from "react";
import Input from "../Input";
import IntroText from "../Utilities/IntroText";
import CustomLink from "../CustomLink";
import RouterButton from "../RouterButton";
import { Link } from "react-router-dom";
import CenteredContainer from "../Utilities/CenteredContainer";
import ShowPassword from "../Utilities/ShowPassword";

function SignInPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [inputType, setInputType] = useState("password");

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
        <Link to="/signup">
          <CustomLink text="Kayıt Ol" />
        </Link>
        <CustomLink text="Şifremi Unuttum" />
      </div>
      <div className="absolute bottom-12 left-0 right-0  w-full flex justify-center items-center ">
        <RouterButton to="/createprofile" text="Giriş Yap" />
      </div>
    </CenteredContainer>
  );
}

export default SignInPage;
