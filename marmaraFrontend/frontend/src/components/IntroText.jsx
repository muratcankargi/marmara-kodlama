import React from "react";
import FadedText from "./FadedText";

function IntroText(props) {
  return (
    <div className="mt-24">
      <h1 className="text-2xl font-extrabold tracking-wider">
        {props.mainText}
      </h1>
      <FadedText text={props.fadedText} />
    </div>
  );
}

export default IntroText;
