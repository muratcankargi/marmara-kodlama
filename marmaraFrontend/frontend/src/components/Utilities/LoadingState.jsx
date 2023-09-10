import react from "react";
import { DotPulse } from "@uiball/loaders";

// Yüklenme animasyonları: https://uiball.com/loaders
// bazı yerlerde site bölük pörçük yükleniyor veya
// createprofile a gitmeye çalışırken progress bar yükleniyor
// o yüzden en zindexte üstte loading state koydum
function LoadingState() {
  return (
    <div className="z-[9999999] absolute top-0 left-0 bg-neutral w-screen h-screen grid place-content-center">
      <DotPulse size={50} speed={1.3} color="black" />
    </div>
  );
}

export default LoadingState;
