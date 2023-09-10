import axios from "axios";

export function useAuthenticate() {
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      });

      return response.data.token;
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("auth");
      return true;
    } catch (error) {
      console.log("Error: ", error.message);
      return false;
    }
  };

  const authenticate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/authenticate",
        {
          token: localStorage.getItem("auth"),
        }
      );

      return response.data;
    } catch (error) {
      console.log("Error: ", error.message);
      return false;
    }
  };

  return { login, logout, authenticate };
}
