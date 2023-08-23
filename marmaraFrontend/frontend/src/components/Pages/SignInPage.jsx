import React from "react";
import Input from "../Input";
import IntroText from "../Utilities/IntroText";
import CustomLink from "../CustomLink";
import RouterButton from "../RouterButton";
import { Link } from "react-router-dom";

function SignInPage() {
  return (
    <div className="w-full h-full flex justify-center">
      <div>
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
          <Link to="/signup">
            <CustomLink text="Kayıt Ol" />
          </Link>
          <CustomLink text="Şifremi Unuttum" />
        </div>
        <div className="absolute bottom-12 left-0 right-0  w-full flex justify-center items-center mt-20">
          <RouterButton to="/createprofile" text="Giriş Yap" />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
