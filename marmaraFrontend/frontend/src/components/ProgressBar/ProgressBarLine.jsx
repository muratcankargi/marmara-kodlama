import React from "react";

// Width'i değiştirdiğin zaman ilerleyen mavi çizgi
function ProgressBarLine(props) {
  return (
    <div
      className={`transition-all duration-700 absolute  left-0 ${props.width} h-2 ${props.bgColor}`}
    ></div>
  );
}

export default ProgressBarLine;
