import React from "react";

// Hem signInPage hem de SignUpPage de kullanıldığı için oluşturdum
// büyük ihtimal createProfile de de benzer bi şey kullanılacak
function CenteredContainer(props) {
  return (
    <div className="w-full h-full flex justify-center bg-neutral dark:bg-darkNeutral">
      <div className="w-3/4">{props.children}</div>
    </div>
  );
}

export default CenteredContainer;
