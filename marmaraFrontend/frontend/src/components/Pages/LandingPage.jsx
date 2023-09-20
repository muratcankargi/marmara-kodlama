import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Utilities/Logo";
import FadedText from "../Utilities/FadedText";
import Waves from "../Utilities/Waves";
import QuestionMark from "../Utilities/QuestionMark";
import Button from "../Utilities/Button";
import CenteredContainer from "../Utilities/CenteredContainer";
import ThemeSwitcher from "../Utilities/ThemeSwitcher";

function FadedTextContainer() {
  return (
    <div className=" w-full flex items-center justify-center mt-12 font-medium">
      <FadedText text="Eşya" />
    </div>
  );
}

function FooterContainer() {
  return (
    <div className="mt-48">
      <div className="flex justify-between items-center ">
        <div className="z-50">
          <ThemeSwitcher />
        </div>
        <div className="z-50">
          <QuestionMark />
        </div>
      </div>
    </div>
  );
}

function Buttons() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signin");
  };

  return (
    <div className="w-full flex flex-col gap-4 mt-4 items-center  ">
      <Button onClickFunction={handleClick} text={"kaybettim".toUpperCase()} />
      <Button onClickFunction={handleClick} text={"buldum".toUpperCase()} />
    </div>
  );
}

function LandingPage() {
  return (
    <CenteredContainer paddingTop="pt-16">
      <Logo />
      <FadedTextContainer />
      <Buttons />
      <FooterContainer />
      <Waves />
    </CenteredContainer>
  );
}

export default LandingPage;
