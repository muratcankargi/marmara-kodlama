import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import SignInPage from "./Pages/SignInPage";
import CreateProfilePage from "./Pages/CreateProfilePage";
import SignUpPage from "./Pages/SignUpPage";
import ProgressBar from "./ProgressBar/ProgressBar";
import ProtectedRoute from "./RouteRelated/ProtectedRoute";
import DeclarationDetails from "./Pages/DeclarationDetails";
import Feed from "./Pages/Feed";
import CreateDeclaration from "./Pages/CreateDeclaration";
import WithPermission from "./RouteRelated/WithPermission";
import { useTheme } from "./Contexts/ThemeContext";

function App() {
  const { pathname } = useLocation();
  const { theme } = useTheme();

  return (
    <div className={`bg-neutral ${theme}  `}>
      <ProgressBar pathname={pathname} />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/signin" element={<SignInPage />} />

        <Route path="/signup" element={<SignUpPage />} />

        <Route
          path="/feed"
          element={
            <ProtectedRoute redirect="/signin">
              <WithPermission
                allowedPermissions={["user", "admin"]}
                redirect="/createprofile"
              >
                <Feed />
              </WithPermission>
            </ProtectedRoute>
          }
        />

        <Route
          path="/createDeclaration"
          element={
            <ProtectedRoute redirect="/signin">
              <WithPermission
                allowedPermissions={["user", "admin"]}
                redirect="/createprofile"
              >
                <CreateDeclaration />
              </WithPermission>
            </ProtectedRoute>
          }
        />

        <Route
          path="/createprofile"
          element={
            <ProtectedRoute redirect="/signin">
              <WithPermission
                allowedPermissions={["almostUser", "admin"]}
                redirect="/feed"
              >
                <CreateProfilePage />
              </WithPermission>
            </ProtectedRoute>
          }
        />

        <Route
          path="/declarationdetails"
          element={
            <ProtectedRoute redirect="/signin">
              <WithPermission
                allowedPermissions={["user", "admin"]}
                redirect="/feed"
              >
                <DeclarationDetails />
              </WithPermission>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
