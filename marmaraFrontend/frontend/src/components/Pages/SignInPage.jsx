import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Input from "../Utilities/Input";
import IntroText from "../Utilities/IntroText";
import CustomLink from "../RouteRelated/CustomLink";
import Button from "../Utilities/Button";
import CenteredContainer from "../Utilities/CenteredContainer";
import InputWithShowPassword from "../Utilities/InputWithShowPassword";
import { useValidate } from "../CustomHooks/useValidate";
import { useUserInfo } from "../CustomHooks/useUserInfo";
import { useAuthenticate } from "../CustomHooks/useAuthenticate";

function CustomLinkContainer() {
  return (
    <div className="flex w-full justify-between items-center mt-6">
      <CustomLink to="/signup" text="Kayıt Ol" />
      <CustomLink text="Şifremi Unuttum" />
    </div>
  );
}

function Inputs({ setUserInfo, invalid }) {
  const [inputType, setInputType] = useState("password");

  return (
    <>
      <Input
        invalid={invalid}
        setState={setUserInfo}
        inputName="email"
        src="/images/mailIcon.png"
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
    </>
  );
}

function ButtonContainer({ userInfo, validation, login }) {
  const navigate = useNavigate();
  const { email, password } = userInfo;

  const checkInputs = () => {
    const { checkEmail } = validation;
    return checkEmail(email);
  };

  const handleClick = async () => {
    if (checkInputs()) {
      const token = await login(email, password);
      if (token) {
        // loginden token gelmişse kaydediyoruz ve yönlendiriyoruz
        swal({
          title: "Bilgileriniz Doğrulandı!",
          icon: "success",
          button: "Tamam",
        });
        localStorage.setItem("auth", token);
        navigate("/feed");
      } else {
        swal({
          title: "Bilgileriniz Doğrulanamadı",
          icon: "error",
          button: "Tamam",
        });
      }
    }
  };

  return (
    <div className="absolute bottom-12 left-0 right-0  w-full flex justify-center items-center ">
      <Button onClickFunction={handleClick} text="Giriş Yap" />
    </div>
  );
}

function SignInPage() {
  const [userInfo, setUserInfo] = useUserInfo({
    email: "",
    password: "",
  });

  const { invalid, validation } = useValidate();

  const { login } = useAuthenticate();

  return (
    <CenteredContainer>
      <IntroText
        mainText="Tekrar hoş geldiniz"
        fadedText="Marmara kayıp eşya ağı"
      />
      <Inputs setUserInfo={setUserInfo} invalid={invalid} />
      <CustomLinkContainer />
      <ButtonContainer
        login={login}
        userInfo={userInfo}
        validation={validation}
      />
    </CenteredContainer>
  );
}

export default SignInPage;
