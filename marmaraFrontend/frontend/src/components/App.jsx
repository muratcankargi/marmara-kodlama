import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import SignInPage from "./Pages/SignInPage";
import CreateProfilePage from "./Pages/CreateProfilePage";
import SignUpPage from "./Pages/SignUpPage";
import ProgressBar from "./ProgressBar/ProgressBar";
import ProtectedRoute from "./RouteRelated/ProtectedRoute";
import Feed from "./Pages/Feed";

function App() {
  const { pathname } = useLocation();

  const [studentInfo, setStudentInfo] = useState({});
  // kayıt olurken yaptığımız
  // request den gelen bilgiyi
  // createprofile'a aktarıyor ama isim biraz sıkıntılı
  // olmuş daha açıklayıcı yapalım.

  return (
    <div className="w-screen bg-neutral">
      <ProgressBar pathname={pathname} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/signup"
          element={<SignUpPage setStudentInfo={setStudentInfo} />}
        />
        <Route
          path="/createprofile"
          element={
            <ProtectedRoute ifNot="/signin">
              <CreateProfilePage studentInfo={studentInfo} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute ifNot="/signin">
              <Feed />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
