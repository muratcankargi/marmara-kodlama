import React from "react";

function Button(props) {
  return (
    <button className="px-5 py-2 text-white bg-accent font-bold text-2xl rounded-full">
      {props.text}
    </button>
  );
}

export default Button;
