// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Manage user authentication state here, including login, logout, and user information.
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Implement the authenticate function
  const authenticate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/authenticate",
        {
          token: localStorage.getItem("auth"),
        }
      );

      // If authentication is successful, set the user state with user data
      const userData = response.data.message;

      setUser(userData);
    } catch (error) {
      console.log("Authentication Error: ", error.message);
      // If authentication fails, set the user state to null
      setUser(null);
    } finally {
      // Set isLoading to false once the authentication process is complete
      setIsLoading(false);
    }
  };

  // Login yapıldığı zaman email ve password gönderiyoruz
  // Server token gönderiyor
  const login = async (email, password) => {
    try {
      // Böyle bir kullanıcı varsa
      const response = await axios.post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      });

      // serverdan gene bütün bilgiler gelmeli
      setUser({ abilities: "user" });

      return response.data.message;
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  // Logout yapıldığı zaman localStorage dan siliyoruz serverdan
  // silmiyoruz ama silinebilir?
  const logout = () => {
    try {
      localStorage.removeItem("auth");
      setUser(null);
      return true;
    } catch (error) {
      console.log("Error: ", error.message);
      return false;
    }
  };

  // SignUp yapıldığı zaman bir token döndürülücek
  // Serverda kullanıcının adı,soyadı,numarası kayıt ediliyor o tokenle beraber
  // Tokeni olduğu için createprofilepage e geçebilecek ama daha ilerleyemeyecek
  // tokenin yetkilerine bakılacak
  const signup = async (personalId, fatherName, birthDate) => {
    // Burada bir token döndürülecek serverdan
    try {
      // Sign upda girilen bilgilere sahip öğrenci var mı diye bakılıyor
      const response = await axios.post("http://localhost:8000/api/isStudent", {
        TCKimlikNo: personalId,
        BabaAdi: fatherName,
        DogumTarihi: birthDate,
      });

      // bilgileri döndürmeli
      console.log(response.data.message);

      // token
      return response.data.message;
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  // Burası kullanıcının emailini ve şifresini servera yollayacak ve
  // Tokenin yetkileri güncellenecek (serverda)
  const saveUser = async (userInfo) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/saveUser",
        userInfo
      );

      setUser(response.data.message);

      return response.data.message;
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const createDeclaration = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/createDeclaration",
        {
          title: title,
          description: description,
          token: localStorage.getItem("auth"),
          tags: ["cüzdan", "maltepe"],
          visibility: true,
          image_source: "",
        }
      );

      return response.data.message;
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        authenticate,
        signup,
        saveUser,
        createDeclaration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
