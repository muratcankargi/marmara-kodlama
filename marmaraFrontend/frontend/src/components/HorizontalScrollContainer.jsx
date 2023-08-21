import React, { useState } from "react";
import LandingPage from "./LandingPage";
import SignInPage from "./SignInPage";
import CreateProfilePage from "./CreateProfilePage";

// Bu component sadece scroll üzerine çalışıyor style lar ayrı yarattığım page ler üzerinde verilecek
function HorizontalScrollContainer() {
  const [switchTo, setSwitchTo] = useState({});

  // Bu fonksiyonu SwitchPageButton componentinden çağıracağımız için ihtiyacımız olan bütün pagelere gönderiyoruz.
  const switchPage = (style) => {
    setSwitchTo(style);
  };

  // Bu variable lardan hangisini uygularsak style olarak, o sayfaya gidiyoruz.
  const styles = {
    switchToLandingPage: { transform: "translateX(0%)" },
    switchToSignInPage: { transform: "translateX(-100vw)" },
    switchToCreateProfilePage: { transform: "translateX(-200vw)" },
  };

  // Width'imiz 300vw, 3 tane 100vw lik sayfamız var.
  return (
    <div
      className="w-[300vw] h-screen flex transition-all ease-in-out duration-150"
      style={switchTo}
    >
      <LandingPage switchPage={switchPage} switchStyles={styles} />
      <SignInPage switchPage={switchPage} switchStyles={styles} />
      <CreateProfilePage switchPage={switchPage} switchStyles={styles} />
    </div>
  );
}

export default HorizontalScrollContainer;
