import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alert } from "../Utilities/alert";
import Input from "../Utilities/Input";
import Button from "../Utilities/Button";
import CenteredContainer from "../Utilities/CenteredContainer";
import InputWithShowPassword from "../Utilities/InputWithShowPassword";
import AddPicture from "../Utilities/AddPicture";
import { useValidate } from "../CustomHooks/useValidate";
import { useAuth } from "../Contexts/AuthContext";
import ThemeSwitcher from "../Utilities/ThemeSwitcher";

function Inputs({ setUserInfo, invalid }) {
  const [inputType, setInputType] = useState("password");

  return (
    <>
      <Input
        invalid={invalid}
        setState={setUserInfo}
        inputName="email"
        imageName="mailIcon.png"
        darkImageName="mailIconDark.png"
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
        imageName="lock.png"
        darkImageName="lockDark.png"
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

  const { saveUser } = useAuth();

  const handleSave = async () => {
    if (checkInputs()) {
      try {
        const response = await saveUser({
          email: userInfo.email,
          password: userInfo.password,
          token: localStorage.getItem("auth"),
        });
        if (response) {
          alert("saved");
          navigate("/anasayfa");
        } else {
          alert("notSaved");
          navigate("/kaydol");
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
  };

  return <Button onClickFunction={handleSave} text="Kaydet" />;
}

function FooterContainer({ userInfo, validation }) {
  return (
    <div className="grid grid-cols-3 mt-20 sm:mt-48">
      <ThemeSwitcher />
      <ButtonContainer userInfo={userInfo} validation={validation} />
    </div>
  );
}

//fotoğraf yükleme kısmı yapılacak
function CreateProfilePage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const { invalid, validation } = useValidate();

  // Bu sayfa sadece almostUser yetkisine sahip kullanıcılara
  // Gösterilecek
  return (
    <CenteredContainer paddingTop="pt-24">
      <AddPicture />
      <Inputs setUserInfo={setUserInfo} invalid={invalid} />
      <FooterContainer userInfo={userInfo} validation={validation} />
    </CenteredContainer>
  );
}

export default CreateProfilePage;
