import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alert } from "../Utilities/alert";
import { RegularInput } from "../Utilities/Input";
import Button from "../Utilities/Button";
import CenteredContainer from "../Utilities/CenteredContainer";
import InputWithShowPassword from "../Utilities/InputWithShowPassword";
import AddPicture from "../Utilities/AddPicture";
import { useValidate } from "../CustomHooks/useValidate";
import { useAuth } from "../Contexts/AuthContext";
import ThemeSwitcher from "../Utilities/ThemeSwitcher";
import FullContainer from "../Utilities/FullContainer";

function Inputs({ setUserInfo, invalid }) {
  const [inputType, setInputType] = useState("password");

  return (
    <>
      <RegularInput
        invalid={invalid}
        setState={setUserInfo}
        inputName="email"
        imageName="mailIcon.png"
        darkImageName="mailIconDark.png"
        alt="User Icon"
        type="Email"
        placeholder="Email"
      />
      <RegularInput
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

function MyProfile() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const { invalid, validation } = useValidate();

  return (
    <FullContainer paddingTop="pt-24">
      <div className="flex justify-between gap-8 px-24">
        <div className="w-2/3 border">
          <h1>Paylaşılan İlanlar</h1>
        </div>
        <div className="w-1/3">
          <AddPicture />
          <Inputs setUserInfo={setUserInfo} invalid={invalid} />
        </div>
      </div>
    </FullContainer>
  );
}

export default MyProfile;
