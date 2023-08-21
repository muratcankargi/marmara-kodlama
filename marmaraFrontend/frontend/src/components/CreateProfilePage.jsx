import React from "react";
import SwitchPageButton from "./SwitchPageButton";

function CreateProfilePage(props) {
  const { switchPage, switchStyles } = props;

  return (
    <div className="w-screen h-screen">
      <h1>Create Profile Page</h1>
      <SwitchPageButton
        switchTo={switchStyles.switchToCreateProfilePage}
        switchPage={switchPage}
        buttonText={"Complete profile"}
      />
    </div>
  );
}

export default CreateProfilePage;
