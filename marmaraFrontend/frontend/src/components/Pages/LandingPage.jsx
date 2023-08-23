import React from "react";
import Logo from "../Utilities/Logo";
import FadedText from "../Utilities/FadedText";
import Waves from "../Utilities/Waves";
import QuestionMark from "../Utilities/QuestionMark";
import RouterButton from "../RouterButton";

function LandingPage() {
  return (
    <div className="w-full h-full ">
      <Logo />
      <div className="w-full flex items-center justify-center mt-12 font-medium">
        <FadedText text="Eşya" />
      </div>
      <div className="w-full flex flex-col gap-4 mt-4 items-center  ">
        <RouterButton to="/signin" text="KAYBETTİM" />
        <RouterButton to="/signin" text="BULDUM" />
      </div>
      <QuestionMark />
      <Waves />
    </div>
  );
}

export default LandingPage;
