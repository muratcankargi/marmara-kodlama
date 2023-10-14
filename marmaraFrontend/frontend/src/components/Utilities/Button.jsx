import React from "react";

function Button(props) {
  const { text, onClickFunction, isWaiting } = props;

  const handleClick = () => {
    if (onClickFunction) {
      onClickFunction();
    }
  };

  return (
    <button
      disabled={isWaiting}
      onClick={handleClick}
      className={`${
        isWaiting ? "bg-gray-700 pointer-events-none" : "bg-accent"
      } cursor-pointer w-32 py-2  rounded-full text-white font-bold tracking-wide text-center`}
    >
      {text}
    </button>
  );
}

export default Button;
