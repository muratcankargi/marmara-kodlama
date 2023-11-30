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
      className={`cursor-pointer  
       py-2 rounded-full px-3 text-white font-bold tracking-wide bg-accent text-center`}
    >
      {text}
    </button>
  );
}

export default Button;
