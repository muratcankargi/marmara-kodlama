import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Input from "../Utilities/Input";
import IntroText from "../Utilities/IntroText";
import Button from "../Utilities/Button";
import CustomLink from "../RouteRelated/CustomLink";
import CenteredContainer from "../Utilities/CenteredContainer";
import { useValidate } from "../CustomHooks/useValidate";
import { useUserInfo } from "../CustomHooks/useUserInfo";

function Inputs({ setUserInfo, invalid }) {
  return (
    <>
      <Input
        invalid={invalid}
        setState={setUserInfo}
        inputName="personalId"
        src="/images/id-card.png"
        alt="Id Card icon"
        type="Number"
        placeholder="T.C. Kimlik No"
      />
      <Input
        invalid={invalid}
        setState={setUserInfo}
        inputName="fatherName"
        src="/images/user.png"
        alt="User Icon"
        type="Text"
        placeholder="Baba Adı"
      />
      <Input
        invalid={invalid}
        setState={setUserInfo}
        inputName="birthDate"
        src="/images/calendar.png"
        alt="Calendar Icon"
        type="Date"
        placeholder="Doğum Tarihiniz"
      />
    </>
  );
}

function CustomLinkContainer() {
  return (
    <div className="flex w-full justify-between items-center mt-6">
      <CustomLink to="/signin" text="Giriş Yap" />
      <CustomLink text="Bu bilgileri neden istiyoruz?" />
    </div>
  );
}

function ButtonContainer({
  userInfo,
  setStudentInfo,
  setIsAuthenticated,
  validation,
}) {
  const navigate = useNavigate();
  const { personalId, fatherName, birthDate } = userInfo;

  const checkInputs = () => {
    const { checkPersonalId, checkFatherName, checkBirthDate } = validation;

    return (
      checkPersonalId(personalId) &&
      checkFatherName(fatherName) &&
      checkBirthDate(birthDate)
    );
  };

  const handleSignUp = async () => {
    if (checkInputs()) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/isStudent",
          {
            TCKimlikNo: personalId,
            BabaAdi: fatherName,
            DogumTarihi: birthDate,
          }
        );

        // Gelen blgiler doğruysa devam değilse olduğu yerde kalıyor
        if (response.data) {
          swal({
            title: "Bilgileriniz Doğrulandı!",
            icon: "success",
            button: "Tamam",
          });
          //Kullanıcı giriş yaptığında server'dan bir adet
          // token isticez sonra bu tokenı localStorage'a kaydedicez
          setIsAuthenticated(true);
          localStorage.setItem("auth", "true");

          setStudentInfo({
            studentName: response.data.name,
            studentSurname: response.data.surname,
            studentNumber: response.data.studentNumber,
          });

          navigate("/createprofile");
        } else {
          swal({
            title: "Bilgileriniz Doğrulanamadı",
            icon: "error",
            button: "Tamam",
          });
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
  };

  return (
    <div className="absolute bottom-12 left-0 right-0 w-full flex justify-center items-center ">
      <Button onClickFunction={handleSignUp} text="Kayıt Ol" />
    </div>
  );
}

function SignUpPage({ setIsAuthenticated, setStudentInfo }) {
  const [userInfo, setUserInfo] = useUserInfo({
    personalId: "",
    fatherName: "",
    birthDate: "",
  });

  const { invalid, validation } = useValidate();

  return (
    <CenteredContainer>
      <IntroText mainText="Hoş geldiniz" fadedText="Marmara kayıp eşya ağı" />
      <Inputs setUserInfo={setUserInfo} invalid={invalid} />
      <CustomLinkContainer />
      <ButtonContainer
        userInfo={userInfo}
        setIsAuthenticated={setIsAuthenticated}
        setStudentInfo={setStudentInfo}
        validation={validation}
      />
    </CenteredContainer>
  );
}

export default SignUpPage;
