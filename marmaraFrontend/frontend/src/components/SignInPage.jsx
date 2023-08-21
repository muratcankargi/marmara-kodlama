import React from "react";
import SwitchPageButton from "./SwitchPageButton";

function SignInPage(props) {
  const { switchPage, switchStyles } = props;

  return (
    <div className="w-screen h-screen">
      <h1>Sign in page</h1>
      <SwitchPageButton
        switchTo={switchStyles.switchToCreateProfilePage}
        switchPage={switchPage}
        buttonText={"Switch to Create profile page"}
      />
    </div>
  );
}

export default SignInPage;
