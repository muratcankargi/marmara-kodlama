import React from "react";

// Hem signInPage hem de SignUpPage de kullanıldığı için oluşturdum
// büyük ihtimal createProfile de de benzer bi şey kullanılacak
function CenteredContainer({ children, paddingTop = "pt-40" }) {
  return (
    <div
      className={`min-h-screen flex justify-center ${paddingTop} bg-neutral 
    dark:bg-darkNeutral transition-colors duration-300`}
    >
      <div className="w-3/4">{children}</div>
    </div>
  );
}

export default CenteredContainer;
