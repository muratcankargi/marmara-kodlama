import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthenticate } from "../CustomHooks/useAuthenticate";

// Kullanıcının token olmadan göremeyeceği sayfalar bu şekilde ayarlanacak

// TODO: kullanıcı giriş yapmışsa signin ve signup sayfalarına
// gidememeli, feed'e yönlendirilmeli.
const ProtectedRoute = ({ children, ifNot }) => {
  const { authenticate } = useAuthenticate();

  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // localStorage token vs server token doğrulaması
        const isAuthenticated = await authenticate();
        setAuthenticated(isAuthenticated.token);
      } catch (error) {
        // Handle any errors that may occur during authentication.
        console.error("Authentication error:", error);
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  // burası olmadan çalışmıyor
  if (authenticated === null) {
    // Loading state, you can render a loading spinner or something else here.
    return <div>Loading...</div>;
  }

  // Authenticated olmuşssa protected route içindeki componenti renderla
  // olmamışsa ifNot adresine yönlendir
  return authenticated ? children : <Navigate to={ifNot} />;
};

export default ProtectedRoute;
