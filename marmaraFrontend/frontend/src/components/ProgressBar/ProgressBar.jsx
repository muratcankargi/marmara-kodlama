import React from "react";
import ProgressBarCircle from "./ProgressBarCircle";
import ProgressBarLineSpaceHolder from "./ProgressBarLineSpaceHolder";
import ProgressBarLine from "./ProgressBarLine";

function ProgressBar(props) {
  // Tailwind'e props la className gönderirken buna dikkat etmek lazım
  // https://tailwindcss.com/docs/content-configuration#class-detection-in-depth

  const { properties } = props;
  const { width, circles } = properties;

  // circles?.[0] undefined olursa diye kontrol yapıyoruz böyle bi değer varsa onu yoksa defafult
  // olarak "1" gösteriyor
  return (
    <div className="w-full mt-7 flex justify-center">
      <div className="relative flex justify-center items-center text-white  ">
        <ProgressBarCircle content={circles?.[0] ?? "1"} />
        <ProgressBarLineSpaceHolder />
        <ProgressBarCircle content={circles?.[1] ?? "2"} />
        <ProgressBarLineSpaceHolder />
        <ProgressBarCircle content={circles?.[2] ?? "3"} />
        <ProgressBarLine width="w-full" bgColor="bg-black" />
        <ProgressBarLine width={width ?? "w-20"} bgColor="bg-primary-200" />
      </div>
    </div>
  );
}

export default ProgressBar;
