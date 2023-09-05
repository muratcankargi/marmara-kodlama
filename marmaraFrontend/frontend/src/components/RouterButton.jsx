import React from "react";
import { Link } from "react-router-dom";

function RouterButton(props) {
  // to ya bir değer atamazsak default olarak "" alıyor
  const { to = "", text, onClickFunction } = props;

  const handleClick = () => {
    if (onClickFunction) {
      onClickFunction();
    }
  };

  return (
    <Link
      onClick={handleClick}
      to={to}
      role="button"
      className="cursor-pointer w-32 py-2 bg-accent rounded-full text-white font-bold tracking-wide text-center"
    >
      {text}
    </Link>
  );
}

export default RouterButton;
