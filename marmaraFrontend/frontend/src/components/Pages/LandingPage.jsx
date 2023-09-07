import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Utilities/Logo";
import FadedText from "../Utilities/FadedText";
import Waves from "../Utilities/Waves";
import QuestionMark from "../Utilities/QuestionMark";
import Button from "../Utilities/Button";

function LandingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signin");
  };

  return (
    <div className="w-full h-full ">
      <Logo />
      <div className="w-full flex items-center justify-center mt-12 font-medium">
        <FadedText text="Eşya" />
      </div>
      <div className="w-full flex flex-col gap-4 mt-4 items-center  ">
        <Button onClickFunction={handleClick} text="KAYBETTİM" />
        <Button onClickFunction={handleClick} text="BULDUM" />
      </div>
      <QuestionMark />
      <Waves />
    </div>
  );
}

export default LandingPage;
