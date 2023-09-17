import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import SignInPage from "./Pages/SignInPage";
import CreateProfilePage from "./Pages/CreateProfilePage";
import SignUpPage from "./Pages/SignUpPage";
import ProgressBar from "./ProgressBar/ProgressBar";
import ProtectedRoute from "./RouteRelated/ProtectedRoute";
import Feed from "./Pages/Feed";
import WithPermission from "./RouteRelated/WithPermission";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="w-screen bg-neutral dark">
      <ProgressBar pathname={pathname} />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/signin" element={<SignInPage />} />

        <Route path="/signup" element={<SignUpPage />} />

        <Route
          path="/feed"
          element={
            <ProtectedRoute redirect="/signin">
              <WithPermission mustPermission="user" redirect="/createprofile">
                <Feed />
              </WithPermission>
            </ProtectedRoute>
          }
        />

        <Route
          path="/createprofile"
          element={
            <ProtectedRoute redirect="/signin">
              <WithPermission mustPermission="almostUser" redirect="/feed">
                <CreateProfilePage />
              </WithPermission>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
