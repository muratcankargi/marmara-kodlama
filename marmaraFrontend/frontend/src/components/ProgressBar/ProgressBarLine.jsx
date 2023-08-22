import React from "react";

function ProgressBarLine(props) {
  return <div className={`w-${props.width} h-2 bg-${props.bgColor}`}></div>;
}

export default ProgressBarLine;
