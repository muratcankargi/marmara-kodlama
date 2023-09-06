import React, { useState } from "react";
import LandingPage from "./Pages/LandingPage";
import SignInPage from "./Pages/SignInPage";
import CreateProfilePage from "./Pages/CreateProfilePage";
import SignUpPage from "./Pages/SignUpPage";
import ProgressBar from "./ProgressBar/ProgressBar";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Routes, useLocation } from "react-router-dom";

// Routes'ları açıklayan video https://www.youtube.com/watch?v=SLfhMt5OUPI
function App() {
  // Progressbar'ın style'ını hangi sayfada olduğumuza göre değiştiriyoruz
  const { pathname } = useLocation();

  //normalde burda bi token doğrulaması olacak
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage?.getItem("auth") || false
  );

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
      progressBarStyles.width = "w-64";
      progressBarStyles.circles[0] = "✓";
      progressBarStyles.circles[1] = "✓";
      progressBarStyles.circles[2] = "3";
      break;
    default:
      break;
  }

  // Ayrıca giriş yapmışsa signin ve signup sayfalarını görmemeli
  // Veya zaten kayıtolmuşsa o sayfayı atlamalıyız (signup butonuna basıldığında)
  // veritabanından bakabiliriz
  return (
    <div className="w-screen bg-neutral">
      <ProgressBar properties={progressBarStyles} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/createprofile"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              navigateTo="/signup"
            >
              <CreateProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
