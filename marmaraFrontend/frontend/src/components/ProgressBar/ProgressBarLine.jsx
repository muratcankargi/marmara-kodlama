import React from "react";

function ProgressBarLine(props) {
  return (
    <div
      className={`transition-all rounded-md duration-700 absolute left-5 ${props.width} h-2 ${props.bgColor}`}
    ></div>
  );
}

export default ProgressBarLine;
