import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingState from "../Utilities/LoadingState";
import { useAuthz } from "../Contexts/AuthzContext";

const WithPermission = ({ children, allowedPermissions, redirect }) => {
  const dbPermissions = ["user", "almostUser", "admin"];
  // bunlar kullanabileceğimiz permissionlar bunlardan farklı bi şey varsa direkt signin'e yönlendirilmeli
  // ToDo: burası db'den çekilebilir

  const { permissions } = useAuthz();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (permissions) {
      setIsLoading(false);
    }
  }, [permissions, children]);

  if (isLoading) {
    return <LoadingState />;
  }

  // app.jsx de array olarak belirlediğimiz allowedPermissions u burada kullanıyoruz
  // yani hangi permissonlar bu sayfayı görebilir
  return dbPermissions.includes(permissions) ? (
    allowedPermissions.includes(permissions) ? (
      children
    ) : (
      <Navigate to={redirect} />
    )
  ) : (
    <Navigate to="/signin" />
  );
};

export default WithPermission;
