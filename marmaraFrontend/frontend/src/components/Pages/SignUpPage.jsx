import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Input from "../Utilities/Input";
import IntroText from "../Utilities/IntroText";
import Button from "../Utilities/Button";
import CustomLink from "../RouteRelated/CustomLink";
import CenteredContainer from "../Utilities/CenteredContainer";

function useUserInfo() {
  const [userInfo, setUserInfo] = useState({
    personalId: "",
    fatherName: "",
    birthDate: "",
  });

  return [userInfo, setUserInfo];
}

function Inputs({ setUserInfo }) {
  return (
    <>
      <Input
        setState={setUserInfo}
        inputName="personalId"
        src="/images/id-card.png"
        alt="Id Card icon"
        type="Number"
        placeholder="T.C. Kimlik No"
      />
      <Input
        setState={setUserInfo}
        inputName="fatherName"
        src="/images/user.png"
        alt="User Icon"
        type="Text"
        placeholder="Baba Adı"
      />
      <Input
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

function ButtonContainer({ userInfo, setStudentInfo, setIsAuthenticated }) {
  const navigate = useNavigate();

  const checkInputs = () => {
    const { personalId, fatherName, birthDate } = userInfo;

    if (!personalId.length) {
      swal({
        title: "Başarısız İşlem",
        text: "Lütfen T.C. kimlik numaranızı doğru giriniz!",
        icon: "error",
        button: "Tamam",
      });
      return false;
    }

    if (!fatherName.length) {
      swal({
        title: "Başarısız İşlem",
        text: "Lütfen baba adınızı doğru giriniz!",
        icon: "error",
        button: "Tamam",
      });
      return false;
    }

    if (!birthDate.length) {
      swal({
        title: "Başarısız İşlem",
        text: "Lütfen doğum tarihinizi doğru giriniz!",
        icon: "error",
        button: "Tamam",
      });

      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (checkInputs()) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/isStudent",
          {
            TCKimlikNo: userInfo.personalId,
            BabaAdi: userInfo.fatherName,
            DogumTarihi: userInfo.birthDate,
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
  const [userInfo, setUserInfo] = useUserInfo();

  return (
    <CenteredContainer>
      <IntroText mainText="Hoş geldiniz" fadedText="Marmara kayıp eşya ağı" />
      <Inputs setUserInfo={setUserInfo} />
      <CustomLinkContainer />
      <ButtonContainer
        userInfo={userInfo}
        setIsAuthenticated={setIsAuthenticated}
        setStudentInfo={setStudentInfo}
      />
    </CenteredContainer>
  );
}

export default SignUpPage;
