import React from "react";
import ProgressBarCircle from "./ProgressBarCircle";
import ProgressBarLineBackground from "./ProgressBarLineBackground";
import ProgressBarLine from "./ProgressBarLine";
function ProgressBar() {
  // Tailwind'e props la className gönderirken buna dikkat etmek lazım
  // https://tailwindcss.com/docs/content-configuration#class-detection-in-depth

  return (
    <div className="w-full mt-7 flex justify-center px-2 ">
      <div className="relative flex justify-center items-center text-white">
        <ProgressBarCircle content="1" />
        <ProgressBarLineBackground />
        <ProgressBarCircle content="2" />
        <ProgressBarLineBackground />
        <ProgressBarCircle content="3" />
        <ProgressBarLine width="w-20" />
      </div>
    </div>
  );
}

export default ProgressBar;
