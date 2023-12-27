import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alert } from "../Utilities/alert";
import { RegularInput } from "../Utilities/Input";
import IntroText from "../Utilities/IntroText";
import CustomLink from "../RouteRelated/CustomLink";
import Button from "../Utilities/Button";
import CenteredContainer from "../Utilities/CenteredContainer";
import InputWithShowPassword from "../Utilities/InputWithShowPassword";
import { useValidate } from "../CustomHooks/useValidate";
import { useAuth } from "../Contexts/AuthContext";
import ThemeSwitcher from "../Utilities/ThemeSwitcher";

function CustomLinkContainer() {
  return (
    <div className="flex w-full justify-between items-center mt-6">
      <CustomLink to="/kaydol" text="Kayıt Ol" />
      <CustomLink text="Şifremi Unuttum" />
    </div>
  );
}

function Inputs({ setUserInfo, invalid }) {
  const [inputType, setInputType] = useState("password");

  return (
    <div className="mt-12 flex flex-col gap-12">
      <RegularInput
        invalid={invalid}
        setState={setUserInfo}
        inputName="email"
        imageName="mailIcon.png"
        darkImageName="mailIconDark.png"
        alt="Mail Icon"
        type="Email"
        placeholder="Email"
      />
      <InputWithShowPassword
        invalid={invalid}
        setState={setUserInfo}
        type={inputType}
        setInputType={setInputType}
      />
    </div>
  );
}

function ButtonContainer({ userInfo, validation }) {
  const navigate = useNavigate();

  const { email, password } = userInfo;

  const { login } = useAuth();

  const checkInputs = () => {
    const { checkEmail } = validation;
    return checkEmail(email);
  };

  const handleClick = async () => {
    if (checkInputs()) {
      const token = await login(email, password);
      if (token) {
        // loginden token gelmişse kaydediyoruz ve yönlendiriyoruz
        alert("authenticated");
        localStorage.setItem("auth", token);
        navigate("/anasayfa");
      } else {
        alert("notAuthenticated");
      }
    }
  };

  return <Button onClickFunction={handleClick} text="Giriş Yap" />;
}

function FooterContainer({ userInfo, validation }) {
  return (
    <div className="grid grid-cols-3 mt-24 sm:mt-48">
      <ThemeSwitcher />
      <ButtonContainer userInfo={userInfo} validation={validation} />
    </div>
  );
}

function SignInPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { invalid, validation } = useValidate();

  return (
    <CenteredContainer paddingTop="pt-36 ">
      <IntroText
        mainText="Tekrar hoş geldiniz"
        fadedText="Marmara kayıp eşya ağı"
      />
      <Inputs setUserInfo={setUserInfo} invalid={invalid} />
      <CustomLinkContainer />
      <FooterContainer userInfo={userInfo} validation={validation} />
    </CenteredContainer>
  );
}

export default SignInPage;
