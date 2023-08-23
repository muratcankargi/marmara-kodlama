import React from "react";
import ProgressBarCircle from "./ProgressBarCircle";
import ProgressBarLineSpaceHolder from "./ProgressBarLineSpaceHolder";
import ProgressBarLine from "./ProgressBarLine";
function ProgressBar(props) {
  // Tailwind'e props la className gönderirken buna dikkat etmek lazım
  // https://tailwindcss.com/docs/content-configuration#class-detection-in-depth

  const { properties } = props;

  console.log(properties);

  // width={(properties && properties.width) || "w-20"} -> properties undefined değilse properties.width olarak ayarla
  // undefined ise w-20 olarak ayarla
  return (
    <div className="w-full mt-7 flex justify-center  ">
      <div className="relative flex justify-center items-center text-white">
        <ProgressBarCircle
          content={(properties && properties.firstCircle) || "1"}
        />
        <ProgressBarLineSpaceHolder />
        <ProgressBarCircle
          content={(properties && properties.secondCircle) || "2"}
        />
        <ProgressBarLineSpaceHolder />
        <ProgressBarCircle
          content={(properties && properties.thirdCircle) || "3"}
        />
        <ProgressBarLine width="w-full" bgColor="bg-black" />
        <ProgressBarLine
          width={(properties && properties.width) || "w-20"}
          bgColor="bg-primary-200"
        />
      </div>
    </div>
  );
}

export default ProgressBar;
