import React from "react";

function FullContainer({ children, paddingTop = "" }) {
  return (
    <div
      className={`${paddingTop} min-h-screen bg-neutral dark:bg-darkNeutral transition-colors duration-300 `}
    >
      <div>{children}</div>
    </div>
  );
}

export default FullContainer;
