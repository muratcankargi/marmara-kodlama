// AuthzContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const AuthzContext = createContext();

export const AuthzProvider = ({ children }) => {
  // user permissonları buraya yönetiliyor
  const { permissions } = useAuth();

  return (
    <AuthzContext.Provider value={{ permissions }}>
      {children}
    </AuthzContext.Provider>
  );
};

export const useAuthz = () => useContext(AuthzContext);
