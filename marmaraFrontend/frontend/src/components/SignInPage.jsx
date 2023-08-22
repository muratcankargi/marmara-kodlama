import React from "react";
import SwitchPageButton from "./SwitchPageButton";
import ProgressBar from "./ProgressBar/ProgressBar";
import FadedText from "./FadedText";

function SignInPage(props) {
  const { switchPage, switchStyles } = props;

  return (
    <div className="w-screen h-screen">
      <ProgressBar />
      <div className="mt-24 ml-6">
        <h1 className="text-2xl font-extrabold tracking-wider">
          Tekrar hoş geldin
        </h1>
        <FadedText text="Marmara kayıp eşya ağı" />
      </div>
      <div>
        <div className="px-6 mt-12 w-full flex p-3 gap-2">
          <div className="text-2xl">@</div>
          <div className="border-2 border-b-black border-t-0 border-l-0 border-r-0">
            <input className="outline-0 border-0" type="email" />
          </div>
        </div>
        <div className="px-6 mt-12 w-full   flex p-3 gap-2 ">
          <div className="text-2xl">*</div>
          <div className="border-2 border-b-black border-t-0 border-l-0 border-r-0">
            <input className="outline-0 border-0" type="password" />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between px-6 mt-6">
        <h2 className="text-black font-regular">Kayıt Ol</h2>
        <h2 className="text-black font-regular text-center">
          Şifremi <br /> Unuttum
        </h2>
      </div>
      <div className="w-full flex justify-center items-center mt-12">
        <button className="px-5 py-2 mx-auto  text-white bg-accent font-bold text-2xl rounded-full">
          Giriş Yap
        </button>
      </div>
    </div>
  );
}

export default SignInPage;
