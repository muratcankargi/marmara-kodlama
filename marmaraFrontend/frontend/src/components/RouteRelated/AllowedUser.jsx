import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingState from "../Utilities/LoadingState";
import { useAuthorization } from "../CustomHooks/useAuthorization";

// Eğer kullanıcı authenticate edilirse buraya geliyor
// children -> son olarak renderlenecek component
// allowedPermission -> bu componenti hangi permissiona sahip kullanıcılar görebilir
// redirect -> permission uygun değilse nereye gönderilmeli
const AllowedUser = ({ children, allowedPermission, redirect }) => {
  const { getPermissions } = useAuthorization();
  const [permission, setPermission] = useState(null);

  // Kullanıcı yetkilerini çekiyoruz
  useEffect(() => {
    const permissions = async () => {
      const checkPermissions = await getPermissions();
      setPermission(checkPermissions);
    };

    permissions();
  }, []);

  // async çağırdığımız için bilgi gelene kadar
  // bunu gösteriyoruz
  // default useState(null) yapmazsak burası hata verir
  if (permission === null) {
    return <LoadingState />;
  }

  console.log(permission);

  // Serverdan gelen kullanıcı yetkisi ve props olarak girdiğimiz yetki
  return allowedPermission === permission ? (
    children
  ) : (
    <Navigate to={redirect} />
  );
};

export default AllowedUser;
