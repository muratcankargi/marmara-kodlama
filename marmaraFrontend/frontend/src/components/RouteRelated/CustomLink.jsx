import React from "react";
import { Link } from "react-router-dom";

function CustomLink(props) {
  const styles = {
    width: "8rem",
    textAlign: "center",
  };

  return (
    <Link
      to={props.to}
      className="text-black font-semibold"
      style={props.text.length > 15 ? styles : {}}
    >
      {props.text}
    </Link>
  );
}

export default CustomLink;
