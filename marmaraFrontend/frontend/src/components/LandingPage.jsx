import React from "react";
import SwitchPageButton from "./SwitchPageButton";
import ProgressBar from "./ProgressBar/ProgressBar";
import Logo from "./Logo";
import FadedText from "./FadedText";
import Waves from "./Waves";
import QuestionMark from "./QuestionMark";

function LandingPage(props) {
  const { switchPage, switchStyles } = props;

  return (
    <div className="w-screen h-screen bg-neutral relative">
      <ProgressBar />
      <Logo />
      <div className="w-full flex items-center justify-center mt-12 font-medium">
        <FadedText text="Eşya" />
      </div>

      <div className="w-full flex flex-col gap-4 mt-4 items-center ">
        <SwitchPageButton
          switchTo={switchStyles.switchToSignInPage}
          handleFunction={switchPage}
          buttonText={"KAYBETTİM"}
        />

        <SwitchPageButton
          switchTo={switchStyles.switchToSignInPage}
          handleFunction={switchPage}
          buttonText={"BULDUM"}
        />
      </div>
      <QuestionMark />
      <Waves />
    </div>
  );
}

export default LandingPage;
