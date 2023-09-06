import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import RouterButton from "../RouterButton";
import CenteredContainer from "../Utilities/CenteredContainer";
import swal from "sweetalert";
import ShowPassword from "../Utilities/ShowPassword";
import QuestionMark from "../Utilities/QuestionMark";

//fotoğraf yükleme kısmı yapılacak
function CreateProfilePage(props) {
  const { studentInfo } = props;

  const navigate = useNavigate();

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
          navigate("/feed"); // burası ve else deki navigate neden çalışmıyor hiç
          // bir fikrim yok
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
      <QuestionMark />
      <div className="absolute bottom-16 left-0 right-0 w-full flex justify-center items-center ">
        <RouterButton onClickFunction={handleSave} text="Kaydet" />
      </div>
    </CenteredContainer>
  );
}

export default CreateProfilePage;
