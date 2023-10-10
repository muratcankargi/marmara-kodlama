// AuthContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const URL = "http://localhost:8000/api";

// Auth diyor ama basitçe bütün api'leri topladığımız yer
export const AuthProvider = ({ children }) => {
  // Manage user authentication state here, including login, logout, and user information.
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Implement the authenticate function
  const authenticate = async () => {
    try {
      const response = await axios.post(`${URL}/authenticate`, {
        token: localStorage.getItem("auth"),
      });

      // If authentication is successful, set the user state with user data
      const userData = response.data.data.user;
      const userPermissions = response.data.data.abilities;

      setUser(userData);
      setPermissions(userPermissions);

      return response.data.status;
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
      const response = await axios.post(`${URL}/login`, {
        email: email,
        password: password,
      });

      setPermissions({ abilities: "user" });

      return response.data.data.token;
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
      const response = await axios.post(`${URL}/isStudent`, {
        TCKimlikNo: personalId,
        BabaAdi: fatherName,
        DogumTarihi: birthDate,
      });

      // token
      return response.data.data.token;
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  // Burası kullanıcının emailini ve şifresini servera yollayacak ve
  // Tokenin yetkileri güncellenecek (serverda)
  const saveUser = async (userInfo) => {
    try {
      const response = await axios.post(`${URL}/saveUser`, userInfo);

      setUser(response.data.data.user);
      setPermissions(response.data.data.abilities);

      return response.data.status;
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const createDeclaration = async (title, description, tagsArray) => {
    try {
      const response = await axios.post(`${URL}/declarations`, {
        title: title,
        description: description,
        token: localStorage.getItem("auth"),
        tags: tagsArray,
        visibility: true,
        image_source: "",
        type: "lost",
      });

      return response.data.status;
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const getDeclaration = async () => {
    try {
      const response = await axios.get(`${URL}/declarations`);

      return response.data.data;
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const getTagsList = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("auth")}` },
    };

    try {
      const response = await axios.get(`${URL}/tags`, config);

      // Gelen response'u istediğimiz şekle çevirip o şekilde döndürüyoruz
      const newArray = [];

      response.data.data.forEach((item) => {
        const newObject = {};
        newObject.text = item.name;
        newObject.selected = false;
        newArray.push(newObject);
      });

      return newArray;
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  // details için tek id ile card alabileceğimiz api
  const getDeclarationById = async (id) => {
    try {
      const response = await axios.get(`${URL}/declarations/${id}`);

      return response.data.data;
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        permissions,
        login,
        logout,
        isLoading,
        authenticate,
        signup,
        saveUser,
        createDeclaration,
        getTagsList,
        getDeclaration,
        getDeclarationById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
