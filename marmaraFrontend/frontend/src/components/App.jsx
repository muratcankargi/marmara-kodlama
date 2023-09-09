import React, { useState } from "react";
import LandingPage from "./Pages/LandingPage";
import SignInPage from "./Pages/SignInPage";
import CreateProfilePage from "./Pages/CreateProfilePage";
import SignUpPage from "./Pages/SignUpPage";
import ProgressBar from "./ProgressBar/ProgressBar";
import ProtectedRoute from "./RouteRelated/ProtectedRoute";
import Feed from "./Pages/Feed";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();

  // token database çekme işlemleri yapılacak
  const [token, setToken] = useState("");

  const [studentInfo, setStudentInfo] = useState({});
  // Bu yaptığımız kayıt olurken yaptığımız
  // request den gelen bilgiyi
  // createprofile'a aktarıyor ama isim biraz sıkıntılı
  // olmuş daha açıklayıcı yapalım.

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

  const showProgressBar = ["/", "/signin", "/signup", "/createprofile"];

  return (
    <div className="w-screen bg-neutral">
      {showProgressBar.includes(pathname) && (
        <ProgressBar properties={progressBarStyles} />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage setToken={setToken} />} />
        <Route
          path="/signup"
          element={
            <SignUpPage setToken={setToken} setStudentInfo={setStudentInfo} />
          }
        />
        <Route
          path="/createprofile"
          element={
            <ProtectedRoute token={token} ifNot="/signin">
              <CreateProfilePage studentInfo={studentInfo} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute token={token} ifNot="/signin">
              <Feed setToken={setToken} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
