import React from "react";
import SwitchPageButton from "./SwitchPageButton";
import ProgressBar from "./ProgressBar/ProgressBar";
import Input from "./Input";
import IntroText from "./IntroText";
import Button from "./Button";
import CustomLink from "./CustomLink";

function SignInPage(props) {
  const { switchPage, switchStyles } = props;

  const progressBar = {
    width: "w-52",
    firstCircle: "✓",
    secondCircle: "2",
    thirdCircle: "3",
  };

  return (
    <div className="w-screen h-screen flex justify-center">
      <div>
        <ProgressBar properties={progressBar} />
        <IntroText
          mainText="Tekrar hoş geldiniz"
          fadedText="Marmara kayıp eşya ağı"
        />
        <Input
          src="/images/mailIcon.png"
          alt="Mail Icon"
          type="Email"
          placeholder="Email"
        />
        <Input
          src="/images/lock.png"
          alt="Password Icon"
          type="Password"
          placeholder="Şifre"
        />
        <div className="flex w-full justify-between items-center mt-6">
          <CustomLink text="Kayıt Ol" />
          <CustomLink text="Şifremi Unuttum" />
        </div>
        <div className="w-full flex justify-center items-center mt-20">
          <Button text="Giriş Yap" />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
