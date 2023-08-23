import React, { useState } from "react";

function QuestionMark() {
  const [visibility, setVisibility] = useState(false);

  // Grid sayesinde height artarken transition koyabiliyoruz
  // https://www.youtube.com/watch?v=B_n4YONte5A
  const styles = {
    display: "grid",
    gridTemplateRows: visibility ? "1fr" : "0fr",
    padding: visibility ? "1rem" : "0",
  };

  // Text'in yazılı olduğu yeri kapatıp açma
  const triggerMessageBox = (e) => {
    setVisibility((prevValue) => {
      return !prevValue;
    });
    e.preventDefault();
  };

  return (
    <div>
      <div
        className="absolute z-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-black rounded-lg transition-all duration-500"
        style={styles}
      >
        <div className="overflow-hidden">
          <button
            onClick={triggerMessageBox}
            className="px-1 text-white block text-2xl font-extrabold ml-auto"
          >
            𝕏
          </button>
          <p className="text-white pt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            quaerat amet quos odio modi quae est, totam, natus dolor et
            accusamus optio quisquam vel velit ipsa dolorem illo blanditiis
            ducimus. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellat necessitatibus, magni molestiae maiores nam vel expedita
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            inventore esse quaerat sequi enim excepturi consectetur ea tempora
            porro. Magni.
          </p>
        </div>
      </div>
      <button
        onClick={triggerMessageBox}
        className="absolute right-4 bottom-12 z-50 mt-auto w-10 h-10 text-white font-extrabold text-3xl flex items-center justify-center"
      >
        ?
      </button>
    </div>
  );
}

export default QuestionMark;
