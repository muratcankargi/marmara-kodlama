import React from "react";
import { Navigate } from "react-router-dom";

// Kullanıcının token olmadan göremeyeceği sayfalar bu şekilde ayarlanacak
const ProtectedRoute = ({ isAuthenticated, children, navigateTo }) => {
  return isAuthenticated ? children : <Navigate to={navigateTo} />;
};

export default ProtectedRoute;
