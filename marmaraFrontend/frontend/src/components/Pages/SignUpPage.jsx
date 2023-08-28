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

  // İnputların dolulğu falan kontrol edilecek
  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/isStudent", {
        TCKimlikNo: userInfo.personalId,
        BabaAdi: userInfo.fatherName,
        DogumTarihi: userInfo.birthDate,
      });

      console.log(response.data);

      if (response.data !== "") {
        navigate("/createprofile");
      } else {
        console.log("error redirecting");
      }
    } catch (error) {
      // console.log("Error: ", error);
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
        <RouterButton onClickFunction={handleSignUp} to={""} text="Kayıt Ol" />
      </div>
    </CenteredContainer>
  );
}

export default SignUpPage;
