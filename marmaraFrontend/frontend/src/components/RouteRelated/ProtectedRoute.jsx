import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthenticate } from "../CustomHooks/useAuthenticate";
import { useAuthorization } from "../CustomHooks/useAuthorization";
import LoadingState from "../Utilities/LoadingState";

// Kullanıcının token olmadan göremeyeceği sayfalar bu şekilde ayarlanacak

// TODO: kullanıcı giriş yapmışsa signin ve signup sayfalarına
// gidememeli, feed'e yönlendirilmeli.
const ProtectedRoute = ({ children, ifNot }) => {
  const { authenticate } = useAuthenticate();
  const { getPermissions } = useAuthorization();

  const [authenticated, setAuthenticated] = useState(null);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // localStorage token vs server token doğrulaması
        const isAuthenticated = await authenticate();
        setAuthenticated(isAuthenticated.token);
        checkPermissions();
      } catch (error) {
        // Handle any errors that may occur during authentication.
        console.error("Authentication error:", error);
        setAuthenticated(false);
      }
    };

    const checkPermissions = async () => {
      const permission = await getPermissions();
      setPermission(permission);
    };

    checkAuthentication();
  }, []);

  // burası bir nevi async functionların bitmesini beklerken
  // göstereceğimiz yer
  if (authenticated === null || permission === null) {
    return <LoadingState />;
  }

  // sadece permission kontrol edersek
  // sürekli createprofilepage e navigate etmeye çalışıyor
  // o yüzden children createprofilepage olduğunda navigate işlemini
  // durduruyoruz
  if (
    permission === "almostUser" &&
    children.type.name !== "CreateProfilePage"
  ) {
    return <Navigate to="/createprofile" />;
  }

  // almostUser yetkin yoksa createprofilepage i tamamlamışsın
  // demektir yani oraya giriş yapamazsın.
  // ama burada bir sorun var progessbar renderleniyor bekleme
  // yaparken onu çözmemiz lazım.
  if (
    permission !== "almostUser" &&
    children.type.name === "CreateProfilePage"
  ) {
    return <Navigate to="/feed" />;
  }

  return authenticated ? children : <Navigate to={ifNot} />;
};

export default ProtectedRoute;
