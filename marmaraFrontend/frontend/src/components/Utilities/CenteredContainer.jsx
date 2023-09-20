import React from "react";
import { useHamburgerMenu } from "../Contexts/HamburgerMenuContext";

// Hem signInPage hem de SignUpPage de kullanıldığı için oluşturdum
// büyük ihtimal createProfile de de benzer bi şey kullanılacak
function CenteredContainer({ children, paddingTop = "pt-40" }) {
  // hambrugermenu active ise sağdaki scroll u kaldırıyoruz yoksa
  // kapatma butonu yerinden oynuyor
  const { isActive } = useHamburgerMenu();

  return (
    <div
      className={`${
        isActive ? "max-h-screen overflow-y-hidden" : "min-h-screen"
      }
    flex justify-center ${paddingTop} bg-neutral 
    dark:bg-darkNeutral transition-colors duration-300 `}
    >
      <div className="w-3/4">{children}</div>
    </div>
  );
}

export default CenteredContainer;
