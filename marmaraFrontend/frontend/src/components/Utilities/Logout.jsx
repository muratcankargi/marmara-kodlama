import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { alert } from "./alert";
import Button from "./Button";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (logout()) {
      alert("logout");
      navigate("/signin");
    } else {
      alert("notLogout");
    }
  };

  return <Button text="Çıkış Yap" onClickFunction={handleClick} />;
}

export default Logout;
