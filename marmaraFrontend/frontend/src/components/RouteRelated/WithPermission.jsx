import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingState from "../Utilities/LoadingState";
import { useAuthz } from "../Contexts/AuthzContext";

const WithPermission = ({ children, mustPermission, redirect }) => {
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

  return permissions === mustPermission ? children : <Navigate to={redirect} />;
};

export default WithPermission;
