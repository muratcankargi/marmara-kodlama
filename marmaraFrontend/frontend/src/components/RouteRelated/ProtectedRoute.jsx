import React from "react";
import { Navigate } from "react-router-dom";

// Kullanıcının token olmadan göremeyeceği sayfalar bu şekilde ayarlanacak
const ProtectedRoute = ({ isAuthenticated, children, ifNot }) => {
  return isAuthenticated ? children : <Navigate to={ifNot} />;
};

export default ProtectedRoute;
