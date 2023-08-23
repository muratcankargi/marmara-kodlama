import React from "react";

function CustomLink(props) {
  return (
    <a href="/" className="text-black w-32 font-semibold text-center">
      {props.text}
    </a>
  );
}

export default CustomLink;
