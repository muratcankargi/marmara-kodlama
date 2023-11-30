import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { alert } from "./alert";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (logout()) {
      alert("logout");
      navigate("/girisyap");
    } else {
      alert("notLogout");
    }
  };

  return (
    <button
      className="font-bold dark:text-neutral text-darkNeutral"
      onClick={handleClick}
    >
      Çıkış Yap
    </button>
  );
}

export default Logout;
