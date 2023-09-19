import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Utilities/Logo";
import FadedText from "../Utilities/FadedText";
import Waves from "../Utilities/Waves";
import QuestionMark from "../Utilities/QuestionMark";
import Button from "../Utilities/Button";
import CenteredContainer from "../Utilities/CenteredContainer";

function FadedTextContainer() {
  return (
    <div className=" w-full flex items-center justify-center mt-12 font-medium">
      <FadedText text="Eşya" />
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
    <CenteredContainer>
      <Logo />
      <FadedTextContainer />
      <Buttons />
      <QuestionMark />
      <Waves />
    </CenteredContainer>
  );
}

export default LandingPage;
