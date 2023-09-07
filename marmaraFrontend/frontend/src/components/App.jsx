import React, { useState } from "react";
import LandingPage from "./Pages/LandingPage";
import SignInPage from "./Pages/SignInPage";
import CreateProfilePage from "./Pages/CreateProfilePage";
import SignUpPage from "./Pages/SignUpPage";
import ProgressBar from "./ProgressBar/ProgressBar";
import ProtectedRoute from "./RouteRelated/ProtectedRoute";
import Feed from "./Pages/Feed";
import { Route, Routes, useLocation } from "react-router-dom";

// Routes'ları açıklayan video https://www.youtube.com/watch?v=SLfhMt5OUPI
function App() {
  // Progressbar'ın style'ını hangi sayfada olduğumuza göre değiştiriyoruz
  const { pathname } = useLocation();

  //normalde burda bi token doğrulaması olacak
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage?.getItem("auth") || false
  );

  const [studentInfo, setStudentInfo] = useState({});

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

  const mainPaths = ["/", "/signin", "/signup", "/createprofile"];

  /*
  <Route
    path="/signin" | Bu adreste
    element={
      | Auth yapılmışsa signin'e dönmek mantıksız o yüzden feed'e yönlendiriyor
      <ProtectedRoute isAuthenticated={!isAuthenticated} ifNot="/feed"> | Doğrulama durumuna göre "ifNot" adresine yönlendir
        <SignInPage setIsAuthenticated={setIsAuthenticated} /> | Bu componenti göster
      </ProtectedRoute>
    }
  />
  */

  return (
    // burada bi h-screen olmalı sanki
    <div className="w-screen bg-neutral">
      {mainPaths.includes(pathname) && (
        <ProgressBar properties={progressBarStyles} />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signin"
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} ifNot="/feed">
              <SignInPage setIsAuthenticated={setIsAuthenticated} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} ifNot="/feed">
              <SignUpPage
                setIsAuthenticated={setIsAuthenticated}
                setStudentInfo={setStudentInfo}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createprofile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} ifNot="/signin">
              <CreateProfilePage studentInfo={studentInfo} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} ifNot="/signin">
              <Feed setIsAuthenticated={setIsAuthenticated} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
