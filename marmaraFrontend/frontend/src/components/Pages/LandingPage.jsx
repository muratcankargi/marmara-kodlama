import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Utilities/Logo";
import FadedText from "../Utilities/FadedText";
import { QuestionMark, QuestionMarkContent } from "../Utilities/QuestionMark";
import Button from "../Utilities/Button";
import CenteredContainer from "../Utilities/CenteredContainer";
import ThemeSwitcher from "../Utilities/ThemeSwitcher";

function FadedTextContainer() {
  return (
    <div className="w-full flex items-center justify-center mt-12 font-medium">
      <FadedText text="Eşya" />
    </div>
  );
}

function FooterContainer() {
  const [visibility, setVisibility] = useState(false);

  // Grid sayesinde height artarken transition koyabiliyoruz
  // https://www.youtube.com/watch?v=B_n4YONte5A
  const styles = {
    display: "grid",
    gridTemplateRows: visibility ? "1fr" : "0fr",
    padding: visibility ? "1rem" : "0",
  };

  // Text'in yazılı olduğu yeri kapatıp açma
  const triggerMessageBox = (e) => {
    setVisibility((prevValue) => {
      return !prevValue;
    });
    e.preventDefault();
  };

  return (
    <>
      <div className="flex justify-between w-3/4 md:w-1/3 absolute bottom-12 z-50 md:left-1/2 md:-translate-x-1/2">
        <ThemeSwitcher />
        <QuestionMark triggerMessageBox={triggerMessageBox} />
      </div>
      <QuestionMarkContent
        triggerMessageBox={triggerMessageBox}
        styles={styles}
      />
    </>
  );
}

function Buttons() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/girisyap");
  };

  return (
    <div className="w-full flex flex-col gap-4 mt-4 items-center  ">
      <Button onClickFunction={handleClick} text={"kaybettim".toUpperCase()} />
      <Button onClickFunction={handleClick} text={"buldum".toUpperCase()} />
    </div>
  );
}

function Waves() {
  return (
    <img
      src="/images/Waves.png"
      alt="Waves"
      className="absolute left-0 bottom-0 h-72 w-full z-0"
    />
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
