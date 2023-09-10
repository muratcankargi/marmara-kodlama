import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthenticate } from "../CustomHooks/useAuthenticate";

// Kullanıcının token olmadan göremeyeceği sayfalar bu şekilde ayarlanacak
const ProtectedRoute = ({ children, ifNot }) => {
  const { authenticate } = useAuthenticate();

  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const isAuthenticated = await authenticate();
        setAuthenticated(isAuthenticated.user);
      } catch (error) {
        // Handle any errors that may occur during authentication.
        console.error("Authentication error:", error);
        setAuthenticated(false);
      }
    }

    checkAuthentication();
  }, []);

  if (authenticated === null) {
    // Loading state, you can render a loading spinner or something else here.
    return <div>Loading...</div>;
  }

  return authenticated ? children : <Navigate to={ifNot} />;
};

export default ProtectedRoute;
