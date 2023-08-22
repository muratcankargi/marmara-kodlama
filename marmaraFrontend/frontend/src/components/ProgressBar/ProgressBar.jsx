import React from "react";
import ProgressBarCircle from "./ProgressBarCircle";
import ProgressBarLine from "./ProgressBarLine";

function ProgressBar() {
  return (
    <div className="flex w-full justify-center items-center mt-7 text-white">
      <ProgressBarCircle content="1" />
      <ProgressBarLine width="16" bgColor="primary-200" />
      <ProgressBarLine width="8" bgColor="black" />
      <ProgressBarCircle content="2" />
      <ProgressBarLine width="24" bgColor="black" />
      <ProgressBarCircle content="3" />
    </div>
  );
}

export default ProgressBar;
