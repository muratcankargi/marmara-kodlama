import React from "react";
import Input from "../Input";
import { useState } from "react";
import RouterButton from "../RouterButton";
import CenteredContainer from "../Utilities/CenteredContainer";
import axios from "axios";
//fotoğraf yükleme kısmı yapılacak
function CreateProfilePage(props) {
  const [userInfo, setUserInfo] = useState({
    //firstName: "",
    //lastName: "", datayı çekince de alabiliriz şimdi de tutabiliriz
    email: "",
    password: "",
    passwordRepeat: "",
  });
  console.log(userInfo);

  const checkInputs = () => {
    const { email, password, passwordRepeat } = userInfo;

    if (!email.length || !email.includes("@")) {
      console.log("Lütfen geçerli bir email giriniz.");
      return false;
    }

    if (!password.length) {
      console.log("Lütfen şifrenizi giriniz.");
      return false;
    }

    if (!passwordRepeat.length) {
      console.log("Lütfen şifrenizi tekrar giriniz.");
      return false;
    }
    if (passwordRepeat !== password) {
      console.log("şifreler uyuşmuyor.");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (checkInputs()) {
      try {
        const response = await axios.post(
          //"http://localhost:8000/api/isStudent", DOĞRU METOD DEĞİL

          {
            email: userInfo.email,
            password: userInfo.password,
            // passwordRepeat: userInfo.passwordRepeat,
          }
        );
        console.log(response.data);
        // Gelen blgiler doğruysa devam değilse olduğu yerde kalıyor
        if (response.data) {
          //navigate("/createprofile");
          //neereye gidecek
          console.log("kayıt başarılı");
        } else {
          //navigate("/signup")
          // sayfayı yenile
          window.location.reload();
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
  };

  return (
    <CenteredContainer>
      <div className="mt-7 flex-col flex items-center justify-center ">
        <div className="w-24 h-24 rounded-full border bg-primary-100 flex  items-center justify-center ">
          <img src="/images/camera.png" className="w-12 h-12 mx-auto"></img>
        </div>
        <p className="">Fotoğraf yükle</p>
      </div>
      <div>
        <Input
          setState={setUserInfo}
          about="email"
          src="/images/email.png"
          alt="User Icon"
          type="Email"
          placeholder="Email"
        />
        <Input
          setState={setUserInfo}
          about="password"
          src="/images/Key.png"
          alt="Calendar Icon"
          type="Password"
          placeholder="Sifre"
        />
        <Input
          setState={setUserInfo}
          about="passwordRepeat"
          src="/images/Key.png"
          alt="Calendar Icon"
          type="Password"
          placeholder="Sifre Yeniden"
        />
        <div className="absolute bottom-16 left-0 right-0 w-full flex justify-center items-center ">
          <RouterButton onClickFunction={handleSave} text="Kaydet" />
        </div>
      </div>
    </CenteredContainer>
  );
}

export default CreateProfilePage;
