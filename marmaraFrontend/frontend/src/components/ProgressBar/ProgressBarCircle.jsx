import React from "react";

// Content sayıdan tick'e geçerken transition olsun istiyosak burası çalışıyor ama baya uğraşmak
// lazım https://stackoverflow.com/a/33057992
function ProgressBarCircle(props) {
  return (
    <div className=" w-8 aspect-square rounded-full z-50 bg-primary-100 flex items-center justify-center">
      {props.content}
    </div>
  );
}

export default ProgressBarCircle;
