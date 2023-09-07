import React from "react";

function Button(props) {
  const { text, onClickFunction } = props;

  const handleClick = () => {
    if (onClickFunction) {
      onClickFunction();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer w-32 py-2 bg-accent rounded-full text-white font-bold tracking-wide text-center"
    >
      {text}
    </button>
  );
}

export default Button;
