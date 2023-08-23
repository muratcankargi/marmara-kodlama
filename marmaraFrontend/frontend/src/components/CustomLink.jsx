import React from "react";

function CustomLink(props) {
  const styles = {
    width: "8rem",
    textAlign: "center",
  };

  return (
    <a
      href="/"
      className="text-black font-semibold"
      style={props.text.length > 15 ? styles : {}}
    >
      {props.text}
    </a>
  );
}

export default CustomLink;
