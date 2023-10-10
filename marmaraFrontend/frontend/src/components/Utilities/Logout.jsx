import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { alert } from "./alert";
import Button from "./Button";
import { useHamburgerMenu } from "../Contexts/HamburgerMenuContext";
import { useAllFilters } from "../Contexts/AllFilters";

function Logout() {
  const { logout } = useAuth();
  const { setIsActive } = useHamburgerMenu();
  const { setIsActive: setAllFilters } = useAllFilters();
  const navigate = useNavigate();

  const handleClick = () => {
    // çıkış yapmadan önce açık kalma ihtimaline karşın
    // hamburgermenuyu kapatıyoruz ki style da sorun yaşamayalım.
    setIsActive(false);
    setAllFilters(false);
    if (logout()) {
      alert("logout");
      navigate("/girisyap");
    } else {
      alert("notLogout");
    }
  };

  return <Button text="Çıkış Yap" onClickFunction={handleClick} />;
}

export default Logout;
