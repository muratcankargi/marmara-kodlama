import React from "react";

function FadedText(props) {
  return (
    <span className="text-slate-500 dark:text-slate-400 ">{props.text}</span>
  );
}

export default FadedText;
