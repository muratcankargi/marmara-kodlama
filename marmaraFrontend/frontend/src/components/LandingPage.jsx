import React from "react";
import SwitchPageButton from "./SwitchPageButton";
import ProgressBar from "./ProgressBar/ProgressBar";
import Logo from "./Logo";
import FadedText from "./FadedText";
import Waves from "./Waves";
import QuestionMark from "./QuestionMark";

function LandingPage(props) {
  const { switchPage, switchStyles } = props;

  const progressBar = {
    width: "w-20",
    firstCircle: "1",
    secondCircle: "2",
    thirdCircle: "3",
  };

  return (
    <div className="w-screen h-screen relative">
      <ProgressBar properties={progressBar} />
      <Logo />
      <div className="w-full flex items-center justify-center mt-12 font-medium">
        <FadedText text="Eşya" />
      </div>

      <div className="w-full flex flex-col gap-4 mt-4 items-center  ">
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
