import React from "react";
import SwitchPageButton from "./SwitchPageButton";
import ProgressBar from "./ProgressBar/ProgressBar";
import Input from "./Input";
import IntroText from "./IntroText";
import Button from "./Button";
import CustomLink from "./CustomLink";

function SignUpPage(props) {
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
        <IntroText mainText="Hoş geldiniz" fadedText="Marmara kayıp eşya ağı" />
        <Input
          src="/images/id-card.png"
          alt="Id Card icon"
          type="Number"
          placeholder="T.C. Kimlik No"
        />
        <Input
          src="/images/user.png"
          alt="User Icon"
          type="Text"
          placeholder="Baba Adı"
        />
        <Input
          src="/images/calendar.png"
          alt="Calendar Icon"
          type="Text"
          placeholder="Doğum Tarihiniz"
        />
        <div className="flex w-full justify-between items-center  mt-6">
          <CustomLink text="Giriş Yap" />
          <CustomLink text="Bu bilgileri neden istiyoruz?" />
        </div>
        <div className="w-full flex justify-center items-center mt-20">
          <Button text="Kayıt Ol" />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
