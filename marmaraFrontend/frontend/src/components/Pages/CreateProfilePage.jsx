import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Input from "../Utilities/Input";
import Button from "../Utilities/Button";
import CenteredContainer from "../Utilities/CenteredContainer";
import InputWithShowPassword from "../Utilities/InputWithShowPassword";
import AddPicture from "../Utilities/AddPicture";

// Custom hook
function useUserInfo(studentInfo) {
  const [userInfo, setUserInfo] = useState({
    studentName: studentInfo?.studentName || null,
    studentSurname: studentInfo?.studentSurname || null,
    studentNumber: studentInfo?.studentNumber || null,
    email: "",
    password: "",
    passwordRepeat: "",
  });

  return [userInfo, setUserInfo];
}

function Inputs({ setUserInfo }) {
  const [inputType, setInputType] = useState("password");

  return (
    <>
      <Input
        setState={setUserInfo}
        inputName="email"
        src="/images/mailIcon.png"
        alt="User Icon"
        type="Email"
        placeholder="Email"
      />
      <InputWithShowPassword
        setState={setUserInfo}
        type={inputType}
        setInputType={setInputType}
      />
      <Input
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

function ButtonContainer({ userInfo }) {
  const navigate = useNavigate();

  const checkInputs = () => {
    const { email, password, passwordRepeat } = userInfo;

    if (!email.length || !email.includes("@")) {
      swal({
        title: "Lütfen geçerli bir e-posta giriniz.",
        icon: "error",
        button: "Tamam",
      });
      return false;
    }

    if (!password.length) {
      swal({
        title: "Lütfen geçerli bir şifre giriniz.",
        icon: "error",
        button: "Tamam",
      });
      return false;
    }

    if (!passwordRepeat.length) {
      swal({
        title: "Lütfen şifre tekrar bölümünü boş bırakmayınız.",
        icon: "error",
        button: "Tamam",
      });
      return false;
    }

    if (passwordRepeat !== password) {
      swal({
        title: "Şifreler uyuşmuyor.",
        icon: "error",
        button: "Tamam",
      });
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (checkInputs()) {
      try {
        const response = { data: true };
        if (response.data) {
          swal({
            title: "Bilgileriniz Kaydedildi!",
            icon: "success",
            button: "Tamam",
          });
          console.log(userInfo);

          navigate("/feed");
        } else {
          swal({
            title: "Başarısız işlem, lütfen daha sonra tekrar deneyin.",
            icon: "error",
            button: "Tamam",
          });
          localStorage.removeItem("auth");
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
  const [userInfo, setUserInfo] = useUserInfo(studentInfo);

  return (
    <CenteredContainer>
      <AddPicture />
      <Inputs setUserInfo={setUserInfo} />
      <ButtonContainer userInfo={userInfo} />
    </CenteredContainer>
  );
}

export default CreateProfilePage;
