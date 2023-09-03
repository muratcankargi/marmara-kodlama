import React, { useState } from "react";
import Input from "../Input";
import IntroText from "../Utilities/IntroText";
import RouterButton from "../RouterButton";
import CustomLink from "../CustomLink";
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from "../Utilities/CenteredContainer";
import axios from "axios";

function SignUpPage() {
  const [userInfo, setUserInfo] = useState({
    personalId: "",
    fatherName: "",
    birthDate: "",
  });

  const navigate = useNavigate();

  // Burası notification gönderecek
  const checkInputs = () => {
    const { personalId, fatherName, birthDate } = userInfo;

    if (!personalId.length) {
      console.log("Lütfen TC Kimlik numaranızı giriniz.");
      return false;
    }

    if (!fatherName.length) {
      console.log("Lütfen Baba adınızı giriniz.");
      return false;
    }

    if (!birthDate.length) {
      console.log("Lütfen doğum tarihinizi giriniz.");
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
          console.log(response.data);
        // Gelen blgiler doğruysa devam değilse olduğu yerde kalıyor
        if (response.data) {
          navigate("/createprofile");
        } else {
          navigate("/signup");
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
  };

  return (
    <CenteredContainer>
      <IntroText mainText="Hoş geldiniz" fadedText="Marmara kayıp eşya ağı" />
      <Input
        setState={setUserInfo}
        about="personalId"
        src="/images/id-card.png"
        alt="Id Card icon"
        type="Number"
        placeholder="T.C. Kimlik No"
      />
      <Input
        setState={setUserInfo}
        about="fatherName"
        src="/images/user.png"
        alt="User Icon"
        type="Text"
        placeholder="Baba Adı"
      />
      <Input
        setState={setUserInfo}
        about="birthDate"
        src="/images/calendar.png"
        alt="Calendar Icon"
        type="Date"
        placeholder="Doğum Tarihiniz"
      />
      <div className="flex w-full justify-between items-center mt-6">
        <Link to="/signin">
          <CustomLink text="Giriş Yap" />
        </Link>
        <CustomLink text="Bu bilgileri neden istiyoruz?" />
      </div>
      <div className="absolute bottom-12 left-0 right-0 w-full flex justify-center items-center ">
        <RouterButton onClickFunction={handleSignUp} text="Kayıt Ol" />
      </div>
    </CenteredContainer>
  );
}

export default SignUpPage;
