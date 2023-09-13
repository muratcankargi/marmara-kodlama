import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Button from "./Button";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (logout()) {
      swal({
        title: "Başarıyla çıkış yaptınız.",
        icon: "success",
        button: "Tamam",
      });
      navigate("/signin");
    } else {
      swal({
        title: "Çıkış yapılamadı.",
        icon: "error",
        button: "Tamam",
      });
    }
  };

  return <Button text="Çıkış Yap" onClickFunction={handleClick} />;
}

export default Logout;
