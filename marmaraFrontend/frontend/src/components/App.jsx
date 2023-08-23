import React from "react";
import LandingPage from "./Pages/LandingPage";
import SignInPage from "./Pages/SignInPage";
import CreateProfilePage from "./Pages/CreateProfilePage";
import SignUpPage from "./Pages/SignUpPage";
import ProgressBar from "./ProgressBar/ProgressBar";
import { Route, Routes, useLocation } from "react-router-dom";

// Routes'ları açıklayan video https://www.youtube.com/watch?v=SLfhMt5OUPI
function App() {
  // Progressbar'ın style'ını hangi sayfada olduğumuza göre değiştiriyoruz
  const { pathname } = useLocation();

  // Default styles
  let progressBarStyles = {
    width: "w-20",
    circles: ["1", "2", "3"],
  };

  switch (pathname) {
    case "/":
      progressBarStyles.width = "w-12";
      progressBarStyles.circles[0] = "1";
      progressBarStyles.circles[1] = "2";
      progressBarStyles.circles[2] = "3";
      break;
    case "/signin":
    case "/signup":
      progressBarStyles.width = "w-48";
      progressBarStyles.circles[0] = "✓";
      progressBarStyles.circles[1] = "2";
      progressBarStyles.circles[2] = "3";
      break;
    case "/createprofile":
      progressBarStyles.width = "w-72";
      progressBarStyles.circles[0] = "✓";
      progressBarStyles.circles[1] = "✓";
      progressBarStyles.circles[2] = "3";
      break;
    default:
      break;
  }

  return (
    <div className="w-screen bg-neutral">
      <ProgressBar properties={progressBarStyles} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/createprofile" element={<CreateProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
