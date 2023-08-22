import React from "react";

// Width'i değiştirdiğin zaman ilerleyen mavi çizgi
function ProgressBarLine(props) {
  return (
    <div className={`absolute left-0 ${props.width} h-2 bg-primary-200`}></div>
  );
}

export default ProgressBarLine;
