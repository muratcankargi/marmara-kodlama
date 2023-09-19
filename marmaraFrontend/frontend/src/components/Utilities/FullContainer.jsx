import React from "react";

// centeredcontainer in bir başka versiyonu
function FullContainer({ children, paddingTop = "" }) {
  return (
    <div
      className={`${paddingTop} min-h-screen bg-neutral dark:bg-darkNeutral `}
    >
      <div>{children}</div>
    </div>
  );
}

export default FullContainer;
