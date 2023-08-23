import React from "react";
import Input from "../Input";
import IntroText from "../Utilities/IntroText";
import RouterButton from "../RouterButton";
import CustomLink from "../CustomLink";
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <div className="w-full h-full flex justify-center">
      <div>
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
          type="Date"
          placeholder="Doğum Tarihiniz"
        />
        <div className="flex w-full justify-between items-center  mt-6">
          <Link to="/signin">
            <CustomLink text="Giriş Yap" />
          </Link>
          <CustomLink text="Bu bilgileri neden istiyoruz?" />
        </div>
        <div className="absolute bottom-12 left-0 right-0 w-full flex justify-center items-center mt-20">
          <RouterButton to="/createprofile" text="Kayıt Ol" />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
