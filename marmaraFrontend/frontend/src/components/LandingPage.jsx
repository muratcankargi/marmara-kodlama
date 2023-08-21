import React from "react";
import SwitchPageButton from "./SwitchPageButton";

function LandingPage(props) {
  const { switchPage, switchStyles } = props;

  // w-screen ve h-screen silinmemeli
  return (
    <div className="w-screen h-screen">
      <h1>Landing Page</h1>
      <SwitchPageButton
        switchTo={switchStyles.switchToSignInPage}
        switchPage={switchPage}
        buttonText={"Switch to Sign In Page"}
      />
    </div>
  );
}

export default LandingPage;
