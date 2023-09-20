import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import LoadingState from "../Utilities/LoadingState";

// Kullanıcının token olmadan göremeyeceği sayfalar bu şekilde ayarlanacak

// TODO: kullanıcı giriş yapmışsa signin ve signup sayfalarına
// gidememeli, feed'e yönlendirilmeli.
const ProtectedRoute = ({ children, redirect }) => {
  const { user, authenticate } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        await authenticate();
        setIsLoading(false);
      } catch (error) {
        console.error("Authentication failed:", error.message);
      }
    }

    checkAuthentication();
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  // return değerleri daha açık olmalı sadece
  // false yapınca karışıyor
  if (!user.user) {
    return <Navigate to={redirect} />;
  }

  return children;
};

export default ProtectedRoute;
