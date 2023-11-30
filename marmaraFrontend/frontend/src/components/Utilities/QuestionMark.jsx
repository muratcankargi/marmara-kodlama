import React, { useState } from "react";

export function QuestionMarkContent({ styles, triggerMessageBox }) {
  return (
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
          quaerat amet quos odio modi quae est, totam, natus dolor et accusamus
          optio quisquam vel velit ipsa dolorem illo blanditiis ducimus. Lorem
          ipsum dolor sit, amet consectetur adipisicing elit. Repellat
          necessitatibus, magni molestiae maiores nam vel expedita Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Praesentium inventore
          esse quaerat sequi enim excepturi consectetur ea tempora porro. Magni.
        </p>
      </div>
    </div>
  );
}

export function QuestionMark({ triggerMessageBox }) {
  return (
    <button
      onClick={triggerMessageBox}
      className="w-6 h-6 text-white font-extrabold text-3xl"
    >
      <img src="/images/questionMark.png" alt="Question mark" />
    </button>
  );
}
