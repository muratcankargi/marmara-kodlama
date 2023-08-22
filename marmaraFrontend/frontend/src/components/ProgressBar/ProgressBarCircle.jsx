import React from "react";

function ProgressBarCircle(props) {
  return (
    <div className="w-8 aspect-square rounded-full z-50 bg-primary-100 flex items-center justify-center">
      {props.content}
    </div>
  );
}

export default ProgressBarCircle;
