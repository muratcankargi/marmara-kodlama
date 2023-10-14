import React, { useState, useEffect } from "react";
import ProgressBarCircle from "./ProgressBarCircle";
import ProgressBarLineSpaceHolder from "./ProgressBarLineSpaceHolder";
import ProgressBarLine from "./ProgressBarLine";

function ProgressBar({ pathname }) {
  // Tailwind'e props la className gönderirken buna dikkat etmek lazım
  // https://tailwindcss.com/docs/content-configuration#class-detection-in-depth

  const [progressBarStyles, setProgressBarStyles] = useState({
    width: "w-20",
    circles: ["1", "2", "3"],
  });

  useEffect(() => {
    switch (pathname) {
      case "/":
        setProgressBarStyles({
          width: "w-12",
          circles: ["1", "2", "3"],
        });
        break;
      case "/girisyap":
      case "/kaydol":
        setProgressBarStyles({
          width: "w-48",
          circles: ["✓", "2", "3"],
        });
        break;
      case "/profilolustur":
        setProgressBarStyles({
          width: "w-64",
          circles: ["✓", "✓", "3"],
        });
        break;
      default:
        break;
    }
  }, [pathname]);

  const progressBarPaths = ["/", "/girisyap", "/kaydol", "/profilolustur"];

  return progressBarPaths.includes(pathname) ? (
    <div className="absolute w-full pt-7 flex justify-center">
      <div className="relative flex justify-center items-center text-white  ">
        <ProgressBarCircle content={progressBarStyles.circles[0] ?? "1"} />
        <ProgressBarLineSpaceHolder />
        <ProgressBarCircle content={progressBarStyles.circles[1] ?? "2"} />
        <ProgressBarLineSpaceHolder />
        <ProgressBarCircle content={progressBarStyles.circles[2] ?? "3"} />
        <ProgressBarLine width="w-[90%]" bgColor="bg-black" />
        <ProgressBarLine
          width={progressBarStyles.width ?? "w-20"}
          bgColor="bg-primary-200"
        />
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default ProgressBar;
