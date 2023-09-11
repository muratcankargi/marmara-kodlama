import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Input from "../Utilities/Input";
import Button from "../Utilities/Button";
import CenteredContainer from "../Utilities/CenteredContainer";
import InputWithShowPassword from "../Utilities/InputWithShowPassword";
import AddPicture from "../Utilities/AddPicture";
import { useValidate } from "../CustomHooks/useValidate";
import { useUserInfo } from "../CustomHooks/useUserInfo";
import { useAuthenticate } from "../CustomHooks/useAuthenticate";

function Inputs({ setUserInfo, invalid }) {
  const [inputType, setInputType] = useState("password");

  return (
    <>
      <Input
        invalid={invalid}
        setState={setUserInfo}
        inputName="email"
        src="/images/mailIcon.png"
        alt="User Icon"
        type="Email"
        placeholder="Email"
      />
      <InputWithShowPassword
        invalid={invalid}
        setState={setUserInfo}
        type={inputType}
        setInputType={setInputType}
      />
      <Input
        invalid={invalid}
        setState={setUserInfo}
        inputName="passwordRepeat"
        src="/images/lock.png"
        alt="Lock Icon"
        type={inputType}
        placeholder="Şifre Yeniden"
      />
    </>
  );
}

function ButtonContainer({ userInfo, validation }) {
  const navigate = useNavigate();
  const { email, password, passwordRepeat } = userInfo;

  const checkInputs = () => {
    const { checkEmail, checkPassword, checkPasswordRepeat } = validation;

    return (
      checkEmail(email) &&
      checkPassword(password) &&
      checkPasswordRepeat(passwordRepeat, password)
    );
  };

  const { saveUser } = useAuthenticate();

  // Bi yerlere bi çıkış yap butonu koymak lazım aslında
  const handleSave = async () => {
    if (checkInputs()) {
      try {
        const response = await saveUser({
          email: userInfo.email,
          password: userInfo.password,
          token: localStorage.getItem("auth"),
        });
        if (response) {
          swal({
            title: "Bilgileriniz Kaydedildi!",
            icon: "success",
            button: "Tamam",
          });
          localStorage.setItem("auth", response);
          // burası çalışmıyor
          navigate("/feed");
        } else {
          swal({
            title: "Bilgileriniz Kaydedilemedi.",
            icon: "Error",
            button: "Tamam",
          });
          navigate("/signup");
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
  };

  return (
    <div className="absolute bottom-16 left-0 right-0 w-full flex justify-center items-center ">
      <Button onClickFunction={handleSave} text="Kaydet" />
    </div>
  );
}

//fotoğraf yükleme kısmı yapılacak
function CreateProfilePage({ studentInfo }) {
  useEffect(() => {
    swal({
      title: "Bu aşamayı geçmeden siteye devam edemezsiniz.",
      icon: "warning",
      button: "Tamam",
    });
  }, []);

  const [userInfo, setUserInfo] = useUserInfo({
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const { invalid, validation } = useValidate();

  return (
    <CenteredContainer>
      <AddPicture />
      <Inputs setUserInfo={setUserInfo} invalid={invalid} />
      <ButtonContainer userInfo={userInfo} validation={validation} />
    </CenteredContainer>
  );
}

export default CreateProfilePage;
