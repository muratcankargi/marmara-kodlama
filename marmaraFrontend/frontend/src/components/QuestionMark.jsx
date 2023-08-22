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

  // Şuan da z-indexlerden dolayı buttonlara tıklanmıyor düzeltilecek

  return (
    <div className="absolute h-5/6 z-50 bottom-24 right-5 flex ">
      <div
        className="w-64 mt-auto bg-black rounded-lg transition-all duration-500"
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
          </p>
        </div>
      </div>
      <button
        onClick={triggerMessageBox}
        className="mt-auto w-10 h-10 text-white font-extrabold text-3xl flex items-center justify-center"
      >
        ?
      </button>
    </div>
  );
}

export default QuestionMark;
