import React from "react";

function CenteredContainer({ children, paddingTop = "pt-40" }) {
  return (
    <div
      className={`min-h-screen flex justify-center ${paddingTop} bg-neutral 
    dark:bg-darkNeutral transition-colors duration-300`}
    >
      <div className="w-3/4 sm:w-1/2 h-full">{children}</div>
    </div>
  );
}

export default CenteredContainer;
