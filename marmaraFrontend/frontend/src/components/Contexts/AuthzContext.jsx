// AuthzContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const AuthzContext = createContext();

export const AuthzProvider = ({ children }) => {
  // user permissonları buraya yönetiliyor
  const { user } = useAuth();
  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    if (user) {
      setPermissions(user.abilities);
    }
  }, [user]);

  return (
    <AuthzContext.Provider value={{ permissions }}>
      {children}
    </AuthzContext.Provider>
  );
};

export const useAuthz = () => useContext(AuthzContext);
