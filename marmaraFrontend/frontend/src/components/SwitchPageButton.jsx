import React from "react";

function SwitchPageButton(props) {
  const { switchTo, handleFunction, buttonText } = props;

  return (
    <button
      type="button"
      className="w-32 py-2 bg-accent rounded-full text-white font-bold tracking-wide"
      onClick={() => {
        handleFunction(switchTo);
      }}
    >
      {buttonText}
    </button>
  );
}

export default SwitchPageButton;
