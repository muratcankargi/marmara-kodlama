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

        <Route path="/girisyap" element={<SignInPage />} />

        <Route path="/kaydol" element={<SignUpPage />} />

        <Route
          path="/anasayfa"
          element={
            <ProtectedRoute redirect="/girisyap">
              <WithPermission
                allowedPermissions={["user", "admin"]}
                redirect="/profilolustur"
              >
                <Feed />
              </WithPermission>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ilanolustur"
          element={
            <ProtectedRoute redirect="/girisyap">
              <WithPermission
                allowedPermissions={["user", "admin"]}
                redirect="/ilanolustur"
              >
                <CreateDeclaration />
              </WithPermission>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profilolustur"
          element={
            <ProtectedRoute redirect="/girisyap">
              <WithPermission
                allowedPermissions={["almostUser", "admin"]}
                redirect="/anasayfa"
              >
                <CreateProfilePage />
              </WithPermission>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ilandetaylari/:id"
          element={
            <ProtectedRoute redirect="/girisyap">
              <WithPermission
                allowedPermissions={["user", "admin"]}
                redirect="/anasayfa"
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
