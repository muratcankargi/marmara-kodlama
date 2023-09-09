import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthenticate } from "../CustomHooks/useAuthenticate";

// Kullanıcının token olmadan göremeyeceği sayfalar bu şekilde ayarlanacak
const ProtectedRoute = ({ token, children, ifNot }) => {
  const { authenticate } = useAuthenticate();
  console.log(authenticate(token), token, localStorage.getItem("auth"));
  return authenticate(token) ? children : <Navigate to={ifNot} />;
};

export default ProtectedRoute;
