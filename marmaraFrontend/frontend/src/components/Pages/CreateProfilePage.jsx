import React from "react";
import Input from "../Input";
import { useState } from "react";
import RouterButton from "../RouterButton";
import CenteredContainer from "../Utilities/CenteredContainer";
import axios from "axios";
import swal from "@sweetalert/with-react";
import { useLocation } from "react-router-dom";
import ShowPassword from "../Utilities/ShowPassword";
import FadedText from "../Utilities/FadedText";

//fotoğraf yükleme kısmı yapılacak
function CreateProfilePage() {
  const { studentInfo } = useLocation();

  // Direkt olarak createProfile sayfasını açtığımızda bu bilgiler gelmediği için default
  // olarak undefined atadım
  const [userInfo, setUserInfo] = useState({
    studentName: studentInfo?.studentName || "undefined",
    studentSurname: studentInfo?.studentSurname || "undefined",
    studentNumber: studentInfo?.studentNumber || "undefined",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const [inputType, setInputType] = useState("password");

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

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    // bu şekilde fotoğrafı alıyoruz ama kaydetmemiz lazım
    if (e.target.files[0]) {
      swal({
        title: "Fotoğrafınız başarıyla yüklendi.",
        icon: "success",
        button: "Tamam",
      });
    }
  };

  return (
    <CenteredContainer>
      <div className="mt-14 flex-col flex items-center justify-center ">
        <div className="w-24 h-24 rounded-full border bg-primary-100 flex  items-center justify-center ">
          <img
            src="/images/camera.png"
            className="w-12 h-12 mx-auto"
            alt="Camera Icon"
          ></img>
        </div>
        <label className="pt-3" htmlFor="fileInput">
          Fotoğraf Yükle
        </label>
        <input
          type="file"
          placeholder="Fotoğraf Yükle"
          accept=".png, .jpg, .jpeg"
          className="absolute top-[-99999px]"
          // input un default ayarları güzel gözükmediği için ekranda göstermiyoruz
          id="fileInput"
          onChange={handleFileChange}
        />
      </div>
      <Input
        setState={setUserInfo}
        about="email"
        src="/images/mailIcon.png"
        alt="User Icon"
        type="Email"
        placeholder="Email"
      />
      <div className="relative">
        <Input
          setState={setUserInfo}
          about="password"
          src="/images/lock.png"
          alt="Lock Icon"
          type={inputType}
          placeholder="Şifre"
        />
        <ShowPassword setInputType={setInputType} />
      </div>
      <Input
        setState={setUserInfo}
        about="passwordRepeat"
        src="/images/lock.png"
        alt="Lock Icon"
        type={inputType}
        placeholder="Şifre Yeniden"
      />
      {/* <div className="pt-12 text-sm"> questionmark componenti kullanalım
        <FadedText text="*Bu bilgiler siteye giriş yapılırken kullanılacaktır." />
      </div> */}
      <div className="absolute bottom-16 left-0 right-0 w-full flex justify-center items-center ">
        <RouterButton onClickFunction={handleSave} text="Kaydet" />
      </div>
    </CenteredContainer>
  );
}

export default CreateProfilePage;
