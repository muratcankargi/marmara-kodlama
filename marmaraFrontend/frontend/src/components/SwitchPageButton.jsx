import React from "react";

function SwitchPageButton(props) {
  const { switchTo, switchPage, buttonText } = props;

  return (
    <button
      onClick={() => {
        switchPage(switchTo);
      }}
    >
      {buttonText}
    </button>
  );
}

export default SwitchPageButton;
